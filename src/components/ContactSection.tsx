
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xyyravgo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message
        })
      });

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Nos pondremos en contacto contigo dentro de las próximas 24 horas.",
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      } else {
        toast({
          title: "Error al enviar el mensaje",
          description: "Por favor intentá nuevamente más tarde o escribinos por WhatsApp.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Algo salió mal. Probá recargar la página.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me interesa conocer más sobre los servicios de CapassoTech.");
    window.open(`https://wa.me/5493435332132?text=${message}`, '_blank');
  };

  return (
    <section id="contacto" className="py-20 bg-capasso-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hablemos de tu <span className="text-gradient">Proyecto</span>
          </h2>
          <p className="text-xl text-capasso-light/80 max-w-3xl mx-auto">
            Estás a un mensaje de distancia de transformar tu idea en realidad.
            Contanos qué necesitas y te ayudamos a hacerlo posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-capasso-secondary border-capasso-gray hover-glow">
              <CardHeader>
                <CardTitle className="text-capasso-light flex items-center">
                  <Phone className="w-5 h-5 text-capasso-primary mr-3" />
                  Teléfono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-capasso-light/80">+54 9 343 5332132</p>
                <Button
                  onClick={openWhatsApp}
                  className="btn-primary mt-4 w-full"
                >
                  Contactar por WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-capasso-secondary border-capasso-gray hover-glow">
              <CardHeader>
                <CardTitle className="text-capasso-light flex items-center">
                  <Mail className="w-5 h-5 text-capasso-primary mr-3" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-capasso-light/80">contacto@capasso.tech</p>
                <p className="text-sm text-capasso-light/60 mt-2">
                  Respondemos en menos de 24hs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-capasso-secondary border-capasso-gray hover-glow">
              <CardHeader>
                <CardTitle className="text-capasso-light flex items-center">
                  <MapPin className="w-5 h-5 text-capasso-primary mr-3" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-capasso-light/80">Paraná, Entre Ríos, Argentina</p>
                <p className="text-sm text-capasso-light/60 mt-2">
                  Trabajamos con clientes de toda América Latina
                </p>
              </CardContent>
            </Card>

            <div className="bg-capasso-secondary border border-capasso-gray rounded-lg p-6 hover-glow">
              <h3 className="text-lg font-semibold text-capasso-light mb-4">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-capasso-light/80">
                  <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3"></div>
                  Respuesta en menos de 24 horas
                </li>
                <li className="flex items-center text-capasso-light/80">
                  <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3"></div>
                  Presupuesto sin costo
                </li>
                <li className="flex items-center text-capasso-light/80">
                  <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3"></div>
                  Metodología ágil y transparente
                </li>
                <li className="flex items-center text-capasso-light/80">
                  <div className="w-2 h-2 bg-capasso-primary rounded-full mr-3"></div>
                  Soporte post-lanzamiento
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-capasso-secondary border-capasso-gray hover-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-capasso-light">
                  Solicitá una reunión gratuita
                </CardTitle>
                <CardDescription className="text-capasso-light/70">
                  Completá el formulario y nos pondremos en contacto para agendar una reunión
                  donde analizaremos tu proyecto en detalle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-capasso-light">
                        Nombre completo *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-capasso-light">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className="text-capasso-light">
                        Empresa
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-capasso-light">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary"
                        placeholder="+54 9 11 1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-capasso-light">
                      Contanos sobre tu proyecto *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-capasso-dark border-capasso-gray text-capasso-light focus:border-capasso-primary min-h-[120px]"
                      placeholder="Describenos qué necesitas: tipo de proyecto, funcionalidades deseadas, presupuesto estimado, tiempos, etc."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-lg py-3"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>

                  <p className="text-sm text-capasso-light/60 text-center">
                    Al enviar este formulario aceptas que nos pongamos en contacto contigo.
                    Respetamos tu privacidad y no compartimos tu información.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
