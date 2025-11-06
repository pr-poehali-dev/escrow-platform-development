import { useState, useEffect, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const generateContract = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

  const searchableContent = useMemo(() => [
    { section: 'main', text: 'Безопасные сделки без риска платите только за видимый результат эскроу-сервис для бизнеса и частных лиц' },
    { section: 'how-it-works', text: 'Как это работает просто раз-два-три умный контракт ИИ-помощник резервирование средств выполнение обязательств успешное завершение' },
    { section: 'spheres', text: 'Фриланс IT-разработка недвижимость автомобили маркетплейсы оборудование драгоценности деловые услуги' },
    { section: 'depository', text: 'Надежное депонирование через банк Точка номинальный счет безопасность' },
    { section: 'pricing', text: 'Прозрачные тарифы базовый старт бизнес про без скрытых комиссий' },
    { section: 'faq', text: 'ответы на частые вопросы безопасность арбитраж цифровая подпись комиссия' },
  ], []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchableContent
      .filter(item => item.text.toLowerCase().includes(query))
      .map(item => item.section);
  }, [searchQuery, searchableContent]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (searchResults.length > 0) {
      scrollToSection(searchResults[0]);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <Toaster />
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-[#00d4ff]/20 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheck" className="text-white" size={28} />
            </div>
            <div>
              <span className="text-2xl font-bold text-white block leading-tight">Доверенный</span>
              <span className="text-xs text-[#00d4ff]">Цифровой Гарант</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('main')} className="text-white/80 hover:text-[#00d4ff] transition-colors">Главная</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-white/80 hover:text-[#00d4ff] transition-colors">Как работает</button>
            <button onClick={() => scrollToSection('spheres')} className="text-white/80 hover:text-[#00d4ff] transition-colors">Сферы</button>
            <button onClick={() => scrollToSection('pricing')} className="text-white/80 hover:text-[#00d4ff] transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-[#00d4ff] transition-colors">FAQ</button>
          </nav>

          <div className="flex items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <button onClick={() => setIsSearchOpen(true)}>
                <Icon name="Search" className="text-white/60 hover:text-[#00d4ff] cursor-pointer transition-colors" size={20} />
              </button>
              <DialogContent className="bg-[#1a1a2e] border-[#00d4ff]/30">
                <DialogHeader>
                  <DialogTitle className="text-white">Поиск по сайту</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input 
                    placeholder="Введите запрос..." 
                    className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(searchQuery);
                      }
                    }}
                  />
                  {searchQuery && (
                    <div className="space-y-2">
                      <p className="text-white/60 text-sm">
                        {searchResults.length > 0 
                          ? `Найдено разделов: ${searchResults.length}` 
                          : 'Ничего не найдено'}
                      </p>
                      {searchResults.length > 0 && (
                        <Button 
                          onClick={() => handleSearch(searchQuery)}
                          className="w-full bg-[#00d4ff] hover:bg-[#0099cc] text-white"
                        >
                          Перейти к результатам
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <button onClick={() => setIsAIDialogOpen(true)} className="relative group">
              <Icon name="Bot" className="text-white/60 hover:text-[#00d4ff] cursor-pointer transition-all duration-300 hover:scale-110" size={20} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a2e]/95 backdrop-blur-sm p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#00d4ff]/20">
                <p className="text-xs text-white/80">ИИ-помощник для создания контрактов</p>
              </div>
            </button>
            
            <Button variant="outline" className="border-[#00d4ff]/30 text-white hover:bg-[#00d4ff]/10 hidden md:flex">
              Войти
            </Button>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a1a2e] border-[#00d4ff]/20 w-[280px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <button onClick={() => scrollToSection('main')} className="text-white/80 hover:text-[#00d4ff] transition-colors text-left text-lg">Главная</button>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-white/80 hover:text-[#00d4ff] transition-colors text-left text-lg">Как работает</button>
                  <button onClick={() => scrollToSection('spheres')} className="text-white/80 hover:text-[#00d4ff] transition-colors text-left text-lg">Сферы</button>
                  <button onClick={() => scrollToSection('pricing')} className="text-white/80 hover:text-[#00d4ff] transition-colors text-left text-lg">Тарифы</button>
                  <button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-[#00d4ff] transition-colors text-left text-lg">FAQ</button>
                  <Button variant="outline" className="border-[#00d4ff]/30 text-white hover:bg-[#00d4ff]/10 w-full mt-4">
                    Войти
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent className="bg-[#1a1a2e] border-[#00d4ff]/30 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Icon name="Bot" className="text-[#00d4ff]" size={28} />
              ИИ-помощник для создания контрактов
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Заполните параметры сделки, и я составлю юридически корректный договор за несколько секунд
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={generateContract} className="space-y-4 mt-4">
            <div>
              <Label className="text-white mb-2">Тип сделки</Label>
              <Select value={contractData.dealType} onValueChange={(value) => setContractData({...contractData, dealType: value})}>
                <SelectTrigger className="bg-[#16213e] border-[#00d4ff]/20 text-white">
                  <SelectValue placeholder="Выберите тип сделки" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-[#00d4ff]/20">
                  <SelectItem value="freelance">Фриланс и IT-разработка</SelectItem>
                  <SelectItem value="realestate">Недвижимость</SelectItem>
                  <SelectItem value="auto">Автомобили и транспорт</SelectItem>
                  <SelectItem value="marketplace">Маркетплейсы</SelectItem>
                  <SelectItem value="equipment">Оборудование и техника</SelectItem>
                  <SelectItem value="jewelry">Драгоценности и антиквариат</SelectItem>
                  <SelectItem value="business">Деловые услуги</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2">Имя продавца</Label>
                <Input
                  value={contractData.sellerName}
                  onChange={(e) => setContractData({...contractData, sellerName: e.target.value})}
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                  placeholder="ООО 'Компания'"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Имя покупателя</Label>
                <Input
                  value={contractData.buyerName}
                  onChange={(e) => setContractData({...contractData, buyerName: e.target.value})}
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
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
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                  placeholder="100000"
                  type="number"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Срок выполнения</Label>
                <Input
                  value={contractData.deadline}
                  onChange={(e) => setContractData({...contractData, deadline: e.target.value})}
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                  placeholder="30 дней"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2">Описание сделки</Label>
              <Textarea
                value={contractData.dealDescription}
                onChange={(e) => setContractData({...contractData, dealDescription: e.target.value})}
                className="bg-[#16213e] border-[#00d4ff]/20 text-white min-h-[80px]"
                placeholder="Разработка веб-сайта с адаптивным дизайном..."
              />
            </div>

            <div>
              <Label className="text-white mb-2">Условия выполнения</Label>
              <Textarea
                value={contractData.conditions}
                onChange={(e) => setContractData({...contractData, conditions: e.target.value})}
                className="bg-[#16213e] border-[#00d4ff]/20 text-white min-h-[80px]"
                placeholder="Принятие работы в течение 3 дней после сдачи..."
              />
            </div>

            <Button
              type="button"
              onClick={() => generateContract()}
              disabled={isGenerating}
              className="w-full bg-[#00d4ff] hover:bg-[#0099cc] text-white text-lg py-6"
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
                  className="bg-[#16213e] border-[#00d4ff]/30 text-white min-h-[300px] font-mono text-sm"
                />
                <div className="flex gap-3 mt-3">
                  <Button
                    type="button"
                    onClick={downloadContract}
                    variant="outline"
                    className="flex-1 border-[#00d4ff]/30 text-white hover:bg-[#00d4ff]/10"
                  >
                    <Icon name="Download" className="mr-2" size={18} />
                    Скачать
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedContract);
                      toast({
                        title: '📋 Скопировано!',
                        description: 'Контракт скопирован в буфер обмена.',
                      });
                    }}
                    variant="outline"
                    className="flex-1 border-[#00d4ff]/30 text-white hover:bg-[#00d4ff]/10"
                  >
                    <Icon name="Copy" className="mr-2" size={18} />
                    Копировать
                  </Button>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <section id="main" className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4ff]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0099cc]/10 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Безопасные сделки<br />
              <span className="text-[#00d4ff]">без риска и переплат</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Платите только за видимый результат
            </p>
            <p className="text-lg text-white/60 mb-12">
              Цифровой гарант для B2B и частных лиц
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollToSection('depository')} size="lg" className="bg-[#00d4ff] hover:bg-[#0099cc] text-white text-lg px-8 py-6 hover-scale">
                Начать сделку
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button onClick={() => scrollToSection('how-it-works')} size="lg" variant="outline" className="border-[#00d4ff]/30 text-white hover:bg-[#00d4ff]/10 text-lg px-8 py-6 hover-scale">
                Как это работает
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6 bg-[#16213e]/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Как это работает?
            </h2>
            <p className="text-white/60 text-lg">Простая схема безопасных расчетов</p>
          </div>

          <div className="mb-20">
            <Card className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 hover:border-[#00d4ff]/50 transition-all duration-300 hover-scale cursor-pointer" onClick={() => setIsAIDialogOpen(true)}>
              <div className="flex items-start gap-4">
                <Icon name="Sparkles" className="text-[#00d4ff] flex-shrink-0 animate-pulse" size={40} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">ИИ-помощник создаст договор за вас</h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-4">
                    Просто опишите сделку — наш искусственный интеллект составит юридически корректный договор с учетом всех деталей. 
                    Автоматическая генерация, защита интересов обеих сторон, соответствие законодательству РФ.
                  </p>
                  <Button className="bg-[#00d4ff] hover:bg-[#0099cc] text-white">
                    <Icon name="Bot" className="mr-2" size={18} />
                    Попробовать ИИ-помощника
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className={`bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 transition-all duration-500 hover-scale ${
              activeStep === 0 ? 'border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20' : 'hover:border-[#00d4ff]/50'
            }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeStep === 0 ? 'bg-[#00d4ff] scale-110' : 'bg-[#00d4ff]/20'
                }`}>
                  <Icon name="Wallet" className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">1. Резервирование</h4>
                <p className="text-white/70">
                  Покупатель блокирует средства на защищенном счете. Деньги заморожены до выполнения условий.
                </p>
              </div>
            </Card>

            <Card className={`bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 transition-all duration-500 hover-scale ${
              activeStep === 1 ? 'border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20' : 'hover:border-[#00d4ff]/50'
            }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeStep === 1 ? 'bg-[#00d4ff] scale-110' : 'bg-[#00d4ff]/20'
                }`}>
                  <Icon name="CheckCircle" className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">2. Выполнение</h4>
                <p className="text-white/70">
                  Продавец выполняет обязательства. Вся информация о сделке доступна онлайн.
                </p>
              </div>
            </Card>

            <Card className={`bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 transition-all duration-500 hover-scale ${
              activeStep === 2 ? 'border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20' : 'hover:border-[#00d4ff]/50'
            }`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  activeStep === 2 ? 'bg-[#00d4ff] scale-110' : 'bg-[#00d4ff]/20'
                }`}>
                  <Icon name="LockOpen" className="text-white" size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">3. Завершение</h4>
                <p className="text-white/70">
                  После подтверждения покупателя средства автоматически переводятся продавцу.
                </p>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1a1a2e]/30 border border-[#00d4ff]/20 p-6 rounded-lg hover-scale transition-all">
              <Icon name="Scale" className="text-[#00d4ff] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Юридическая защита</h5>
              <p className="text-white/60 text-sm">Через банк с лицензией ЦБ РФ</p>
            </div>
            <div className="bg-[#1a1a2e]/30 border border-[#00d4ff]/20 p-6 rounded-lg hover-scale transition-all">
              <Icon name="Zap" className="text-[#00d4ff] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Автоматизация</h5>
              <p className="text-white/60 text-sm">Умные контракты от ИИ</p>
            </div>
            <div className="bg-[#1a1a2e]/30 border border-[#00d4ff]/20 p-6 rounded-lg hover-scale transition-all">
              <Icon name="ShieldCheck" className="text-[#00d4ff] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Защита сторон</h5>
              <p className="text-white/60 text-sm">Гарантия для всех участников</p>
            </div>
            <div className="bg-[#1a1a2e]/30 border border-[#00d4ff]/20 p-6 rounded-lg hover-scale transition-all">
              <Icon name="Eye" className="text-[#00d4ff] mb-3" size={28} />
              <h5 className="text-white font-semibold mb-2">Прозрачность</h5>
              <p className="text-white/60 text-sm">Контроль на каждом этапе</p>
            </div>
          </div>
        </div>
      </section>

      <section id="spheres" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Сферы применения
          </h2>
          <p className="text-white/60 text-center mb-16 text-lg">Работаем со всеми видами сделок</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Фриланс и IT-разработка', icon: 'Code', desc: 'Веб-разработка, дизайн, маркетинг, консалтинг' },
              { title: 'Недвижимость', icon: 'Home', desc: 'Покупка, аренда, инвестиции в объекты' },
              { title: 'Автомобили и транспорт', icon: 'Car', desc: 'Покупка авто, спецтехники, логистика' },
              { title: 'Маркетплейсы', icon: 'ShoppingCart', desc: 'Сделки между продавцами и покупателями' },
              { title: 'Оборудование и техника', icon: 'Settings', desc: 'Промышленное оборудование, электроника' },
              { title: 'Драгоценности и антиквариат', icon: 'Gem', desc: 'Ювелирные изделия, предметы искусства' },
              { title: 'Деловые услуги', icon: 'Briefcase', desc: 'B2B услуги, подряды, аутсорсинг' },
            ].map((sphere, index) => (
              <Card key={index} className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 overflow-hidden hover:border-[#00d4ff]/50 transition-all duration-300 group cursor-pointer hover-scale animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="p-8">
                  <div className="w-14 h-14 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00d4ff]/30 transition-colors">
                    <Icon name={sphere.icon} className="text-[#00d4ff]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{sphere.title}</h3>
                  <p className="text-white/60">{sphere.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="depository" className="py-24 px-6 bg-[#16213e]/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Надежное депонирование через банк «Точка»
          </h2>
          <div className="mb-12">
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Номинальный счет — специальный банковский счет для временного хранения средств. 
              В отличие от перевода денег частным лицам, номинальный счет в банке «Точка» обеспечивает максимальную безопасность.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Банк имеет лицензию ЦБ РФ и предоставляет банковские гарантии. Ваши средства защищены на государственном уровне.
            </p>
          </div>

          <Card className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 mb-8 hover:border-[#00d4ff]/30 transition-all">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center animate-fade-in">
                <div className="w-20 h-20 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mb-3 hover-scale">
                  <Icon name="User" className="text-[#00d4ff]" size={36} />
                </div>
                <p className="text-white font-semibold">Покупатель</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-[#00d4ff]/30"></div>
                <Icon name="ArrowRight" className="text-[#00d4ff]" size={28} />
                <div className="h-1 w-8 bg-[#00d4ff]/30"></div>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="w-20 h-20 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mb-3 hover-scale">
                  <Icon name="Building2" className="text-[#00d4ff]" size={36} />
                </div>
                <p className="text-white font-semibold">Банк «Точка»</p>
                <p className="text-white/60 text-sm">Номинальный счет</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-[#00d4ff]/30"></div>
                <Icon name="ArrowRight" className="text-[#00d4ff]" size={28} />
                <div className="h-1 w-8 bg-[#00d4ff]/30"></div>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                <div className="w-20 h-20 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mb-3 hover-scale">
                  <Icon name="UserCheck" className="text-[#00d4ff]" size={36} />
                </div>
                <p className="text-white font-semibold">Продавец</p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button onClick={() => setIsAIDialogOpen(true)} size="lg" className="bg-[#00d4ff] hover:bg-[#0099cc] text-white hover-scale">
              <Icon name="Rocket" className="mr-2" size={20} />
              Создать договор с ИИ-помощником
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
            <Card className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 hover-scale transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Базовый</h3>
                <p className="text-white/60">Для разовых сделок</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00d4ff] mb-2">0.8%</div>
                <p className="text-white/60">+ 190 ₽ за сделку</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Без абонентской платы</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">ИИ-контракты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Базовая поддержка</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-[#1a1a2e]/50 border-[#00d4ff]/50 p-8 relative hover-scale transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-white text-xs px-3 py-1 rounded-full">
                Популярный
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Старт</h3>
                <p className="text-white/60">Для малого бизнеса</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00d4ff] mb-2">2 990 ₽</div>
                <p className="text-white/60">в месяц</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Комиссия 0.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">До 20 сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Приоритетная поддержка</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 hover-scale transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Бизнес</h3>
                <p className="text-white/60">Для растущих компаний</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00d4ff] mb-2">7 990 ₽</div>
                <p className="text-white/60">в месяц</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Комиссия 0.3%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">До 100 сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Персональный менеджер</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 p-8 hover-scale transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Про</h3>
                <p className="text-white/60">Для крупного бизнеса</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#00d4ff] mb-2">19 990 ₽</div>
                <p className="text-white/60">в месяц</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Комиссия 0.2%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">Неограниченно сделок</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-[#00d4ff] flex-shrink-0 mt-1" size={16} />
                  <span className="text-white/80 text-sm">API интеграция</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 px-6 bg-[#16213e]/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Часто задаваемые вопросы
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00d4ff] text-left">
                Насколько это безопасно?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Ваши средства хранятся на номинальном счете в банке «Точка», имеющем лицензию ЦБ РФ. 
                Это обеспечивает максимальную безопасность и защиту на государственном уровне.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00d4ff] text-left">
                Что будет, если покупатель/продавец меня обманет?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Средства замораживаются до выполнения всех условий контракта. Если возникает спор, 
                подключается арбитраж, который рассматривает доказательства обеих сторон и принимает решение.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00d4ff] text-left">
                Как быстро замораживаются и размораживаются деньги?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Заморозка происходит мгновенно после подписания контракта. Разморозка и перевод продавцу — 
                в течение 1-3 рабочих дней после подтверждения выполнения условий.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00d4ff] text-left">
                Юридически ли значима цифровая подпись?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Да, мы используем квалифицированную электронную подпись, которая имеет полную юридическую силу 
                согласно 63-ФЗ «Об электронной подписи».
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-[#1a1a2e]/50 border-[#00d4ff]/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-[#00d4ff] text-left">
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
          <div className="bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/20 border border-[#00d4ff]/30 rounded-2xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Получите спецпредложение!
              </h2>
              <p className="text-white/80 text-lg">
                0% комиссии на первые 3 сделки + персональный менеджер
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2">Имя</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
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
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2">Телефон</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="sphere" className="text-white mb-2">Сфера интересов</Label>
                <Input
                  id="sphere"
                  value={formData.sphere}
                  onChange={(e) => setFormData({ ...formData, sphere: e.target.value })}
                  className="bg-[#16213e] border-[#00d4ff]/20 text-white"
                  placeholder="Например: фриланс, авто, недвижимость"
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#00d4ff] hover:bg-[#0099cc] text-white text-lg">
                Получить предложение
                <Icon name="Sparkles" className="ml-2" size={20} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#0f1419] border-t border-[#00d4ff]/20 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0099cc] rounded-lg flex items-center justify-center">
                  <Icon name="ShieldCheck" className="text-white" size={24} />
                </div>
                <div>
                  <span className="text-lg font-bold text-white block leading-tight">Доверенный</span>
                  <span className="text-xs text-[#00d4ff]">Цифровой Гарант</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Безопасные эскроу-сделки для бизнеса и частных лиц
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Сервис</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-white/60 hover:text-[#00d4ff] text-sm">Как работает</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-white/60 hover:text-[#00d4ff] text-sm">Тарифы</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="text-white/60 hover:text-[#00d4ff] text-sm">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Компания</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] text-sm">О нас</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] text-sm">Блог</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] text-sm">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Документы</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] text-sm">Соглашение</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] text-sm">Конфиденциальность</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#00d4ff] text-sm">Оферта</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#00d4ff]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2024 Доверенный Цифровой Гарант. Все права защищены.</p>
            <div className="flex gap-4">
              <Icon name="Mail" className="text-white/60 hover:text-[#00d4ff] cursor-pointer" size={20} />
              <Icon name="Phone" className="text-white/60 hover:text-[#00d4ff] cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
