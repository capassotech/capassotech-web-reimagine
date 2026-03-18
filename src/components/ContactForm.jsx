import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyyravgo";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const ContactForm = ({ context = "home" }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    // honeypot (debe quedar vacío)
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ingresá tu nombre";
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Ingresá un email válido";
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = "Contanos un poco más (mínimo 10 caracteres)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (formData.phone) return; // bot detectado

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          name: formData.name,
          company: formData.company,
          context,
        }),
      });

      if (res.ok) {
        trackEvent("form_submit", { location: context });
        toast({
          title: "¡Mensaje enviado!",
          description: "Te respondemos dentro de 1 día hábil.",
        });
        setFormData({ name: "", email: "", company: "", message: "", phone: "" });
      } else {
        let msg = "No pudimos enviar tu mensaje. Probá nuevamente o escribinos por WhatsApp.";
        try {
          const data = await res.json();
          if (data?.errors?.length) msg = data.errors.map((e) => e.message).join(" ");
        } catch {}
        throw new Error(msg);
      }
    } catch (error) {
      toast({
        title: "No pudimos enviar tu mensaje",
        description: error?.message ?? "Probá nuevamente o escribinos por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action={FORMSPREE_ENDPOINT}
      method="POST"
      className="space-y-6"
      noValidate
    >
      {/* Honeypot (oculto) */}
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-capasso-dark">Nombre *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="field-input"
            placeholder="Juan Pérez"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-capasso-dark">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="field-input"
            placeholder="hola@empresa.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-semibold text-capasso-dark">Empresa</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          className="field-input"
          placeholder="Nombre de tu empresa (opcional)"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-capasso-dark">Mensaje *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          rows={4}
          className="field-input"
          placeholder="Contanos en qué andás y cómo te podemos ayudar..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* Helpers para Formspree */}
      <input type="hidden" name="context" value={context} />
      <input type="hidden" name="_subject" value={`Nuevo contacto desde ${context} — ${formData.name}`} />
      {/* <input type="hidden" name="_redirect" value="https://tu-sitio.com/gracias" /> */}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg">
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>

      <p className="text-sm text-capasso-medium-grey text-center">
        Respondemos dentro de 1 día hábil.
      </p>
    </form>
  );
};

export default ContactForm;
