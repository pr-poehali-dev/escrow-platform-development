import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const { toast } = useToast();
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sphere: '',
  });

  const [contractData, setContractData] = useState({
    dealType: '',
    amount: '',
    dealDescription: '',
    sellerName: '',
    buyerName: '',
    deadline: '',
    conditions: '',
  });

  const [generatedContract, setGeneratedContract] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '✅ Заявка отправлена!',
      description: 'Мы свяжемся с вами в течение 24 часов.',
    });
    setFormData({ name: '', email: '', phone: '', sphere: '' });
  };

  const generateContract = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const contract = `
ДОГОВОР ЭСКРОУ №${Math.floor(Math.random() * 10000)}

Стороны:
Продавец: ${contractData.sellerName || '[Имя продавца]'}
Покупатель: ${contractData.buyerName || '[Имя покупателя]'}

1. ПРЕДМЕТ ДОГОВОРА
${contractData.dealDescription || '[Описание сделки]'}

2. СТОИМОСТЬ
Сумма сделки: ${contractData.amount || '[Сумма]'} руб.
Срок выполнения: ${contractData.deadline || '[Срок]'}

3. УСЛОВИЯ СДЕЛКИ
${contractData.conditions || '[Условия]'}

4. ПОРЯДОК РАСЧЕТОВ
4.1. Покупатель резервирует средства на номинальном счете в банке «Точка».
4.2. После выполнения условий договора и подтверждения Покупателем, средства переводятся Продавцу.
4.3. В случае невыполнения условий, средства возвращаются Покупателю.

5. ОТВЕТСТВЕННОСТЬ СТОРОН
5.1. За неисполнение обязательств стороны несут ответственность согласно законодательству РФ.

Дата составления: ${new Date().toLocaleDateString('ru-RU')}
      `.trim();
      
      setGeneratedContract(contract);
      setIsGenerating(false);
      toast({
        title: '🤖 Контракт готов!',
        description: 'ИИ-помощник составил юридически корректный договор.',
      });
    }, 2000);
  };

  const downloadContract = () => {
    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract.txt';
    a.click();
    toast({
      title: '📄 Контракт скачан!',
      description: 'Файл сохранен на ваше устройство.',
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1A3A]">
      <Toaster />
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1A3A]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="text-[#00C389]" size={32} />
            <span className="text-2xl font-bold text-white">SafeDeal</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('main')} className="text-white/80 hover:text-white transition-colors">Главная</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-white/80 hover:text-white transition-colors">Принцип сделок</button>
            <button onClick={() => scrollToSection('spheres')} className="text-white/80 hover:text-white transition-colors">Сферы</button>
            <button onClick={() => scrollToSection('pricing')} className="text-white/80 hover:text-white transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-white transition-colors">Помощь</button>
          </nav>

          <div className="flex items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <button onClick={() => setIsSearchOpen(true)}>
                <Icon name="Search" className="text-white/60 hover:text-white cursor-pointer transition-colors" size={20} />
              </button>
              <DialogContent className="bg-[#0D2147] border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Поиск по сайту</DialogTitle>
                </DialogHeader>
                <Input placeholder="Введите запрос..." className="bg-card/50 border-white/20 text-white" />
              </DialogContent>
            </Dialog>
            
            <button onClick={() => setIsAIDialogOpen(true)} className="relative group">
              <Icon name="Bot" className="text-white/60 hover:text-[#00C389] cursor-pointer transition-all duration-300 hover:scale-110" size={20} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-card/95 backdrop-blur-sm p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                <p className="text-xs text-white/80">ИИ-помощник для создания контрактов</p>
              </div>
            </button>
            
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hidden md:flex">
              Мой аккаунт
            </Button>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0A1A3A] border-white/10 w-[280px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <button onClick={() => scrollToSection('main')} className="text-white/80 hover:text-white transition-colors text-left text-lg">Главная</button>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-white/80 hover:text-white transition-colors text-left text-lg">Принцип сделок</button>
                  <button onClick={() => scrollToSection('spheres')} className="text-white/80 hover:text-white transition-colors text-left text-lg">Сферы</button>
                  <button onClick={() => scrollToSection('pricing')} className="text-white/80 hover:text-white transition-colors text-left text-lg">Тарифы</button>
                  <button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-white transition-colors text-left text-lg">Помощь</button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full mt-4">
                    Мой аккаунт
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent className="bg-[#0D2147] border-[#00C389]/30 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Icon name="Bot" className="text-[#00C389]" size={28} />
              ИИ-помощник для создания контрактов
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Заполните параметры сделки, и я составлю юридически корректный договор за несколько секунд
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-white mb-2">Тип сделки</Label>
              <Select value={contractData.dealType} onValueChange={(value) => setContractData({...contractData, dealType: value})}>
                <SelectTrigger className="bg-card/50 border-white/20 text-white">
                  <SelectValue placeholder="Выберите тип сделки" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2147] border-white/10">
                  <SelectItem value="services">Услуги и аутсорсинг</SelectItem>
                  <SelectItem value="auto">Автомобили</SelectItem>
                  <SelectItem value="electronics">Электроника</SelectItem>
                  <SelectItem value="jewelry">Драгоценности</SelectItem>
                  <SelectItem value="events">Мероприятия</SelectItem>
                  <SelectItem value="digital">Цифровые активы</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2">Имя продавца</Label>
                <Input
                  value={contractData.sellerName}
                  onChange={(e) => setContractData({...contractData, sellerName: e.target.value})}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="ООО 'Компания'"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Имя покупателя</Label>
                <Input
                  value={contractData.buyerName}
                  onChange={(e) => setContractData({...contractData, buyerName: e.target.value})}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="Иван Иванов"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2">Сумма сделки (₽)</Label>
                <Input
                  value={contractData.amount}
                  onChange={(e) => setContractData({...contractData, amount: e.target.value})}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="100000"
                  type="number"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Срок выполнения</Label>
                <Input
                  value={contractData.deadline}
                  onChange={(e) => setContractData({...contractData, deadline: e.target.value})}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="30 дней"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2">Описание сделки</Label>
              <Textarea
                value={contractData.dealDescription}
                onChange={(e) => setContractData({...contractData, dealDescription: e.target.value})}
                className="bg-card/50 border-white/20 text-white min-h-[80px]"
                placeholder="Разработка веб-сайта с адаптивным дизайном..."
              />
            </div>

            <div>
              <Label className="text-white mb-2">Условия выполнения</Label>
              <Textarea
                value={contractData.conditions}
                onChange={(e) => setContractData({...contractData, conditions: e.target.value})}
                className="bg-card/50 border-white/20 text-white min-h-[80px]"
                placeholder="Принятие работы в течение 3 дней после сдачи..."
              />
            </div>

            <Button
              onClick={generateContract}
              disabled={isGenerating}
              className="w-full bg-[#00C389] hover:bg-[#00A572] text-white text-lg py-6"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                  Генерирую контракт...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Создать контракт
                </>
              )}
            </Button>

            {generatedContract && (
              <div className="mt-6 animate-fade-in">
                <Label className="text-white mb-2">Готовый контракт</Label>
                <Textarea
                  value={generatedContract}
                  readOnly
                  className="bg-card/50 border-[#00C389]/30 text-white min-h-[300px] font-mono text-sm"
                />
                <div className="flex gap-3 mt-3">
                  <Button
                    onClick={downloadContract}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <Icon name="Download" className="mr-2" size={18} />
                    Скачать
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedContract);
                      toast({
                        title: '📋 Скопировано!',
                        description: 'Контракт скопирован в буфер обмена.',
                      });
                    }}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <Icon name="Copy" className="mr-2" size={18} />
                    Копировать
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <section id="main" className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00C389]/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Безопасные сделки без риска:<br />
              <span className="text-[#00C389]">платите только за видимый результат</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 italic mb-4">
              "Доверяй, но проверяй"
            </p>
            <p className="text-lg text-white/80 mb-12">
              Эскроу-сервис для бизнеса и частных лиц
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('depository')} size="lg" className="bg-[#00C389] hover:bg-[#00A572] text-white text-lg px-8 py-6 hover-scale">
                Начать сделку
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button onClick={() => scrollToSection('how-it-works')} size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 hover-scale">
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6 bg-[#0D2147]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Как это работает? Просто, как раз-два-три
            </h2>
          </div>

          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              Умный контракт для вашей безопасности
            </h3>
            <Card className="bg-card/50 border-white/10 p-8 hover:border-[#00C389]/50 transition-all duration-300 hover-scale cursor-pointer" onClick={() => setIsAIDialogOpen(true)}>
              <div className="flex items-start gap-4">
                <Icon name="Sparkles" className="text-[#F59E0B] flex-shrink-0 animate-pulse" size={40} />
                <div>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    Наш ИИ-помощник автоматически составит для вас юридически корректный контракт на основе параметров вашей сделки. 
                    Подпишите его простой и юридически значимой цифровой подписью за пару кликов — и защитите свои интересы до начала работ.
                  </p>
                  <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-white">
                    <Icon name="Bot" className="mr-2" size={18} />
                    Попробовать ИИ-помощника
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className={`bg-card/50 border-white/10 p-8 transition-all duration-500 hover-scale ${
              activeStep === 0 ? 'border-[#00C389] shadow-lg shadow-[#00C389]/20' : 'hover:border-[#00C389]/50'
            }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeStep === 0 ? 'bg-[#00C389] scale-110' : 'bg-[#00C389]/20'
                }`}>
                  <Icon name="Wallet" className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Шаг 1: Резервирование средств</h4>
                <p className="text-white/70">
                  Покупатель заключает контракт и резервирует деньги на номинальном счете в банке «Точка». Средства заморожены.
                </p>
              </div>
            </Card>

            <Card className={`bg-card/50 border-white/10 p-8 transition-all duration-500 hover-scale ${
              activeStep === 1 ? 'border-[#00C389] shadow-lg shadow-[#00C389]/20' : 'hover:border-[#00C389]/50'
            }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeStep === 1 ? 'bg-[#00C389] scale-110' : 'bg-[#00C389]/20'
                }`}>
                  <Icon name="CheckCircle" className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Шаг 2: Выполнение обязательств</h4>
                <p className="text-white/70">
                  Исполнитель спокойно выполняет работу или поставляет товар. Статус сделки отслеживается онлайн.
                </p>
              </div>
            </Card>

            <Card className={`bg-card/50 border-white/10 p-8 transition-all duration-500 hover-scale ${
              activeStep === 2 ? 'border-[#00C389] shadow-lg shadow-[#00C389]/20' : 'hover:border-[#00C389]/50'
            }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeStep === 2 ? 'bg-[#00C389] scale-110' : 'bg-[#00C389]/20'
                }`}>
                  <Icon name="LockOpen" className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Шаг 3: Успешное завершение</h4>
                <p className="text-white/70">
                  Покупатель подтверждает, что все условия выполнены. Средства автоматически размораживаются и переводятся продавцу.
                </p>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card/30 border border-white/10 p-6 rounded-lg hover-scale transition-all">
              <Icon name="Scale" className="text-[#F59E0B] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Юридическая защита</h5>
              <p className="text-white/60 text-sm">Через лицензированный банк</p>
            </div>
            <div className="bg-card/30 border border-white/10 p-6 rounded-lg hover-scale transition-all">
              <Icon name="Zap" className="text-[#F59E0B] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Полная автоматизация</h5>
              <p className="text-white/60 text-sm">Никакой бумажной волокиты</p>
            </div>
            <div className="bg-card/30 border border-white/10 p-6 rounded-lg hover-scale transition-all">
              <Icon name="ShieldCheck" className="text-[#F59E0B] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Снижение рисков</h5>
              <p className="text-white/60 text-sm">Гарантия для обеих сторон</p>
            </div>
            <div className="bg-card/30 border border-white/10 p-6 rounded-lg hover-scale transition-all">
              <Icon name="Eye" className="text-[#F59E0B] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Прозрачность</h5>
              <p className="text-white/60 text-sm">Все этапы сделки онлайн</p>
            </div>
          </div>
        </div>
      </section>

      <section id="spheres" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            Для любых сделок, где важен результат
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Услуги и аутсорсинг', icon: 'Briefcase', desc: 'Фриланс, разработка, маркетинг, консалтинг' },
              { title: 'Автомобили и транспорт', icon: 'Car', desc: 'Покупка авто, спецтехники, мотоциклов' },
              { title: 'Электроника и техника', icon: 'Laptop', desc: 'Гаджеты, компьютеры, бытовая техника' },
              { title: 'Драгоценности и роскошь', icon: 'Gem', desc: 'Часы, украшения, предметы искусства' },
              { title: 'Мероприятия', icon: 'Calendar', desc: 'Свадьбы, корпоративы, организация событий' },
              { title: 'Цифровые активы и NFT', icon: 'Coins', desc: 'Токены, доменные имена, цифровое искусство' },
            ].map((sphere, index) => (
              <Card key={index} className="bg-card border-white/10 overflow-hidden hover:border-[#00C389]/50 transition-all duration-300 group cursor-pointer hover-scale animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="p-8">
                  <div className="w-14 h-14 bg-[#00C389]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00C389]/30 transition-colors">
                    <Icon name={sphere.icon} className="text-[#00C389]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{sphere.title}</h3>
                  <p className="text-white/60">{sphere.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="depository" className="py-24 px-6 bg-[#0D2147]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Надежное депонирование через банк «Точка»
          </h2>
          <div className="mb-12">
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Номинальный счет — это специальный банковский счет, который открывается для временного хранения средств в интересах третьих лиц. 
              В отличие от перевода денег юристу или частному эскроу-агенту, номинальный счет в банке «Точка» обеспечивает максимальную безопасность.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Банк «Точка» имеет лицензию ЦБ РФ и предоставляет банковские гарантии. Ваши средства защищены на государственном уровне.
            </p>
          </div>

          <Card className="bg-card/50 border-white/10 p-8 mb-8 hover:border-[#00C389]/30 transition-all">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center animate-fade-in">
                <div className="w-20 h-20 bg-[#00C389]/20 rounded-full flex items-center justify-center mb-3 hover-scale">
                  <Icon name="User" className="text-[#00C389]" size={36} />
                </div>
                <p className="text-white font-semibold">Покупатель</p>
              </div>
              <div className="flex items-center gap-2 animate-pulse">
                <div className="h-1 w-8 bg-[#00C389]/30"></div>
                <Icon name="ArrowRight" className="text-[#00C389]" size={28} />
                <div className="h-1 w-8 bg-[#00C389]/30"></div>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="w-20 h-20 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mb-3 hover-scale">
                  <Icon name="Building2" className="text-[#F59E0B]" size={36} />
                </div>
                <p className="text-white font-semibold">Банк «Точка»</p>
                <p className="text-white/60 text-sm">Номинальный счет</p>
              </div>
              <div className="flex items-center gap-2 animate-pulse" style={{ animationDelay: '100ms' }}>
                <div className="h-1 w-8 bg-[#00C389]/30"></div>
                <Icon name="ArrowRight" className="text-[#00C389]" size={28} />
                <div className="h-1 w-8 bg-[#00C389]/30"></div>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="w-20 h-20 bg-[#00C389]/20 rounded-full flex items-center justify-center mb-3 hover-scale">
                  <Icon name="UserCheck" className="text-[#00C389]" size={36} />
                </div>
                <p className="text-white font-semibold">Продавец</p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button onClick={() => setIsAIDialogOpen(true)} size="lg" className="bg-[#00C389] hover:bg-[#00A572] text-white hover-scale">
              <Icon name="Rocket" className="mr-2" size={20} />
              Зарегистрироваться и начать сделку
            </Button>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Прозрачные тарифы
          </h2>
          <p className="text-white/60 text-center mb-16">Без скрытых комиссий</p>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card border-white/10 p-8 hover-scale transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Базовый</h3>
                <p className="text-white/60">Для разовых сделок</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00C389] mb-2">0.8%</div>
                <p className="text-white/60">+ 190 ₽ за сделку</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Без абонентской платы</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">ИИ-контракты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Базовая поддержка</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-card border-[#00C389]/50 p-8 relative hover-scale transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00C389] text-white text-xs px-3 py-1 rounded-full">
                Популярный
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Старт</h3>
                <p className="text-white/60">Для малого бизнеса</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00C389] mb-2">2 990 ₽</div>
                <p className="text-white/60">в месяц</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Комиссия 0.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">До 20 сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Приоритетная поддержка</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-card border-white/10 p-8 hover-scale transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Бизнес</h3>
                <p className="text-white/60">Для растущих компаний</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00C389] mb-2">7 990 ₽</div>
                <p className="text-white/60">в месяц</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Комиссия 0.3%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">До 100 сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Персональный менеджер</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-card border-white/10 p-8 hover-scale transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Про</h3>
                <p className="text-white/60">Для крупного бизнеса</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00C389] mb-2">19 990 ₽</div>
                <p className="text-white/60">в месяц</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Комиссия 0.2%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Неограниченно сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00C389] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">API интеграция</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 px-6 bg-[#0D2147]">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Ответы на частые вопросы
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/50 border-white/10 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00C389] text-left">
                Насколько это безопасно?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Ваши средства хранятся на номинальном счете в банке «Точка», имеющем лицензию ЦБ РФ. 
                Это обеспечивает максимальную безопасность и защиту на государственном уровне.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/50 border-white/10 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00C389] text-left">
                Что будет, если покупатель/продавец меня обманет?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Средства замораживаются до выполнения всех условий контракта. Если возникает спор, 
                подключается арбитраж, который рассматривает доказательства обеих сторон и принимает решение.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/50 border-white/10 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00C389] text-left">
                Как быстро замораживаются и размораживаются деньги?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Заморозка происходит мгновенно после подписания контракта. Разморозка и перевод продавцу — 
                в течение 1-3 рабочих дней после подтверждения выполнения условий.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/50 border-white/10 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00C389] text-left">
                Юридически ли значима цифровая подпись?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Да, мы используем квалифицированную электронную подпись, которая имеет полную юридическую силу 
                согласно 63-ФЗ «Об электронной подписи».
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card/50 border-white/10 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00C389] text-left">
                Кто платит комиссию?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Комиссию оплачивает инициатор сделки (обычно покупатель). Условия можно обсудить между сторонами 
                и разделить комиссию по договоренности.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="lead-form" className="py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-to-br from-[#00C389]/20 to-[#F59E0B]/20 border border-[#00C389]/30 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Станьте первым — получите специальные условия!
              </h2>
              <p className="text-white/80 text-lg">
                0% комиссии на первые 3 сделки + персональный менеджер на первый месяц
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2">Имя</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="Иван Петров"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2">Телефон</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="sphere" className="text-white mb-2">Сфера интересов</Label>
                <Input
                  id="sphere"
                  value={formData.sphere}
                  onChange={(e) => setFormData({ ...formData, sphere: e.target.value })}
                  className="bg-card/50 border-white/20 text-white"
                  placeholder="Например: фриланс, авто, недвижимость"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#00C389] hover:bg-[#00A572] text-white text-lg">
                Получить предложение
                <Icon name="Sparkles" className="ml-2" size={20} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#050D1A] border-t border-white/10 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Shield" className="text-[#00C389]" size={24} />
                <span className="text-xl font-bold text-white">SafeDeal</span>
              </div>
              <p className="text-white/60 text-sm">
                Безопасные эскроу-сделки для бизнеса и частных лиц
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Сервис</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-white/60 hover:text-white text-sm">Как работает</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-white/60 hover:text-white text-sm">Тарифы</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="text-white/60 hover:text-white text-sm">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Компания</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white text-sm">О нас</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Блог</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Документы</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Пользовательское соглашение</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Политика конфиденциальности</a></li>
                <li><a href="#" className="text-white/60 hover:text-white text-sm">Публичная оферта</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2024 SafeDeal. Все права защищены.</p>
            <div className="flex gap-4">
              <Icon name="Mail" className="text-white/60 hover:text-white cursor-pointer" size={20} />
              <Icon name="Phone" className="text-white/60 hover:text-white cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
