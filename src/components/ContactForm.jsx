import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const ContactForm = ({ context = "home" }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ingresá tu nombre";
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Ingresá un email válido";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Contanos un poco más (mínimo 10 caracteres)";
    }

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

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      trackEvent("form_submit", { location: context });
      toast({
        title: "¡Mensaje enviado!",
        description: "Te respondemos dentro de 1 día hábil.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast({
        title: "No pudimos enviar tu mensaje",
        description: "Probá nuevamente o escribinos por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-capasso-light">
            Nombre *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
            placeholder="Juan Pérez"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-capasso-light">
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
            placeholder="hola@empresa.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="company" className="text-capasso-light">
          Empresa
        </Label>
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
        <Label htmlFor="message" className="text-capasso-light">
          Mensaje *
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
          placeholder="Contanos tu desafío: objetivos, plazos, stack preferido, métricas a mover..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-lg"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
      <p className="text-sm text-capasso-light/60 text-center">
        Respondemos dentro de 1 día hábil.
      </p>
    </form>
  );
};

export default ContactForm;
