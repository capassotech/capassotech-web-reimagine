import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
          <Label htmlFor="name" className="text-capasso-light">Nombre *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
            placeholder="Juan Pérez"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-capasso-light">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
            placeholder="hola@empresa.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="company" className="text-capasso-light">Empresa</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
          placeholder="Nombre de tu empresa (opcional)"
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-capasso-light">Mensaje *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
          placeholder="Contanos tu desafío: objetivos, plazos, stack preferido, métricas a mover..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>

      {/* Helpers para Formspree */}
      <input type="hidden" name="context" value={context} />
      <input type="hidden" name="_subject" value={`Nuevo contacto desde ${context} — ${formData.name}`} />
      {/* <input type="hidden" name="_redirect" value="https://tu-sitio.com/gracias" /> */}

      <Button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg">
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>

      <p className="text-sm text-capasso-light/60 text-center">
        Respondemos dentro de 1 día hábil.
      </p>
    </form>
  );
};

export default ContactForm;
