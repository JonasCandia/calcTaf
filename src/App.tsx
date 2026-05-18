/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { 
  Calculator, 
  User, 
  Calendar, 
  Dumbbell, 
  Timer, 
  Activity, 
  Waves, 
  Info,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Table as TableIcon,
  Maximize2,
  Moon,
  Sun,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent, animate } from 'motion/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { 
  Sex, 
  getAgeGroup, 
  calculatePoints, 
  getUpperBodyTest, 
  calculateFinalScore, 
  getConcept,
  getUpperBodyTable,
  getAbdominalTable,
  getRunTable,
  getSwimTable
} from './lib/taf-utils';
import { AGE_GROUPS, ScoringTable } from './constants/taf-data';

const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function App() {
  const [sex, setSex] = useState<Sex>('M');
  const [age, setAge] = useState<number>(25);
  const [birthDate, setBirthDate] = useState<string>('');
  const [testDate, setTestDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const [upperBodyValue, setUpperBodyValue] = useState<string>('');
  const [abdominalValue, setAbdominalValue] = useState<string>('');
  const [runValue, setRunValue] = useState<string>('');
  const [includeSwim, setIncludeSwim] = useState<boolean>(false);
  const [swimValue, setSwimValue] = useState<string>('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fieldWarnings, setFieldWarnings] = useState<Record<string, string>>({});

  const [results, setResults] = useState<{
    upperBody: number;
    abdominal: number;
    run: number;
    swim?: number;
    final: number;
    concept: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const resetIconRef = useRef<HTMLSpanElement>(null);

  // Score counter animation
  const scoreMotionValue = useMotionValue(0);
  const [displayScore, setDisplayScore] = useState('0.00');
  useMotionValueEvent(scoreMotionValue, 'change', (v) => setDisplayScore(v.toFixed(2)));
  useEffect(() => {
    if (results) {
      animate(scoreMotionValue, results.final, {
        duration: 0.8,
        ease: EASE_OUT_QUINT,
      });
    } else {
      scoreMotionValue.set(0);
      setDisplayScore('0.00');
    }
  }, [results]);

  // Theme effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calculate age from birth date and test date
  useEffect(() => {
    if (birthDate && testDate) {
      const birth = new Date(birthDate);
      const test = new Date(testDate);
      let calculatedAge = test.getFullYear() - birth.getFullYear();
      const monthDiff = test.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && test.getDate() < birth.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge >= 18 && calculatedAge <= 70) {
        setAge(calculatedAge);
      }
    }
  }, [birthDate, testDate]);

  const ageGroup = useMemo(() => getAgeGroup(age), [age]);
  const upperBodyTestLabel = useMemo(() => getUpperBodyTest(sex, age), [sex, age]);

  const handleCalculate = () => {
    const errors: Record<string, string> = {};
    const warnings: Record<string, string> = {};

    const ubVal = parseFloat(upperBodyValue);
    const abdVal = parseFloat(abdominalValue);
    const runVal = parseFloat(runValue);
    const swVal = includeSwim ? parseFloat(swimValue) : undefined;

    if (!upperBodyValue || isNaN(ubVal) || ubVal <= 0) {
      errors.upperBody = 'Campo obrigatório.';
    } else if (ubVal > 250) {
      warnings.upperBody = 'Valor acima do esperado — verifique a unidade.';
    }

    if (!abdominalValue || isNaN(abdVal) || abdVal <= 0) {
      errors.abdominal = 'Campo obrigatório.';
    } else if (abdVal > 150) {
      warnings.abdominal = 'Valor acima do esperado — verifique.';
    }

    if (!runValue || isNaN(runVal) || runVal <= 0) {
      errors.run = 'Campo obrigatório.';
    } else if (runVal < 500) {
      warnings.run = 'Distância abaixo de 500m — verifique a unidade (use metros).';
    } else if (runVal > 6000) {
      warnings.run = 'Distância acima do esperado para 12 minutos.';
    }

    if (includeSwim) {
      if (!swimValue || swVal === undefined || isNaN(swVal) || swVal <= 0) {
        errors.swim = 'Informe o tempo ou desmarque Natação.';
      } else if (swVal < 15) {
        warnings.swim = 'Tempo muito baixo para 50m — verifique.';
      } else if (swVal > 600) {
        warnings.swim = 'Tempo acima do esperado — verifique a unidade (use segundos).';
      }
    }

    setFieldErrors(errors);
    setFieldWarnings(warnings);

    if (Object.keys(errors).length > 0) return;

    const ubPoints = calculatePoints(ubVal, ageGroup, getUpperBodyTable(sex, age));
    const abdPoints = calculatePoints(abdVal, ageGroup, getAbdominalTable(sex));
    const runPoints = calculatePoints(runVal, ageGroup, getRunTable(sex));
    const swPoints = swVal !== undefined ? calculatePoints(swVal, ageGroup, getSwimTable(sex), true) : undefined;

    const finalScore = calculateFinalScore(ubPoints, abdPoints, runPoints, swPoints);
    
    setResults({
      upperBody: ubPoints,
      abdominal: abdPoints,
      run: runPoints,
      swim: swPoints,
      final: finalScore,
      concept: getConcept(finalScore)
    });
  };

  const handleReset = () => {
    setUpperBodyValue('');
    setAbdominalValue('');
    setRunValue('');
    setSwimValue('');
    setResults(null);
    setFieldErrors({});
    setFieldWarnings({});
    if (resetIconRef.current) {
      animate(resetIconRef.current, { rotate: [0, -360] }, { duration: 0.5, ease: EASE_OUT_QUINT });
    }
  };

  const getConceptColor = (concept: string) => {
    switch (concept) {
      case 'EXCELENTE': return 'concept-excelente';
      case 'MUITO BOM': return 'concept-muito-bom';
      case 'BOM': return 'concept-bom';
      case 'REGULAR': return 'concept-regular';
      case 'INSUFICIENTE': return 'concept-insuficiente';
      default: return 'bg-muted';
    }
  };

  const getConceptBadge = (concept: string) => {
    switch (concept) {
      case 'EXCELENTE': return 'bg-[var(--accent)] text-[var(--primary)]';
      case 'MUITO BOM': return 'bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/30';
      case 'BOM': return 'bg-sky-400/20 text-sky-300 ring-1 ring-sky-400/30';
      case 'REGULAR': return 'bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/30';
      case 'INSUFICIENTE': return 'bg-red-500/25 text-red-400 ring-1 ring-red-500/30';
      default: return 'bg-white/10 text-white/60';
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto transition-colors duration-300">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {Object.values(fieldErrors).join('. ')}
      </div>

      {/* Cabeçalho de identificação — visível apenas na impressão */}
      <div className="hidden print:block mb-6 pb-4" style={{ borderBottom: '2px solid #021859' }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#021859' }}>Corpo de Bombeiros Militar do Rio Grande do Sul</p>
            <p className="text-xl font-black uppercase tracking-widest" style={{ color: '#021859' }}>TAF CBMRS</p>
            <p className="text-xs text-gray-500">Teste de Aptidão Física — Resultado Oficial</p>
          </div>
          <div className="text-right text-xs text-gray-700 space-y-0.5">
            <p><span className="font-semibold">Data do TAF:</span>{' '}{testDate ? new Date(testDate + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</p>
            <p><span className="font-semibold">Idade:</span>{' '}{age} anos</p>
            <p><span className="font-semibold">Sexo:</span>{' '}{sex === 'M' ? 'Masculino' : sex === 'F' ? 'Feminino' : '—'}</p>
          </div>
        </div>
      </div>

      <header className="mb-8 md:mb-12 flex flex-col items-center relative print:hidden">
        <div className="absolute top-0 right-0 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsModalOpen(true)}
            className="nm-btn w-10 h-10 rounded-full"
            aria-label="Ver tabelas de referência"
          >
            <TableIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="nm-btn w-10 h-10 rounded-full overflow-hidden"
            aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDarkMode ? 'sun' : 'moon'}
                initial={{ rotate: -30, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 30, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2, ease: EASE_OUT_QUINT }}
                className="flex items-center justify-center"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
          className="flex flex-col items-center gap-6 pt-14 md:pt-0"
        >
          <div className="nm-card p-5 rounded-3xl">
            <Calculator className="w-12 h-12 text-[var(--primary)]" />
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-[var(--primary)]">
              TAF <span className="text-[var(--accent)]">CBMRS</span>
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.25em] mt-2">
              Calculadora de Aptidão Física
            </p>
          </div>
        </motion.div>
      </header>

      <div className="grid gap-6 md:gap-8">
        {/* Profile Section */}
        <Card className="nm-card border-none overflow-hidden print:hidden">
          <CardHeader className="pb-4 border-b border-white/10">
            <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
              <User className="w-4 h-4" /> Identificação do Militar
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6">
            <div className="space-y-3">
              <Label htmlFor="sex" className="technical-header ml-1">Sexo</Label>
              <div className="nm-inset p-1">
                <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
                  <SelectTrigger id="sex" className="bg-transparent border-none shadow-none focus:ring-0">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="birthDate" className="technical-header ml-1">Nascimento</Label>
              <div className="nm-inset">
                <Input 
                  id="birthDate" 
                  type="date" 
                  value={birthDate} 
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-transparent border-none shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="testDate" className="technical-header ml-1">Data do TAF</Label>
              <div className="nm-inset">
                <Input
                  id="testDate"
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="bg-transparent border-none shadow-none focus-visible:ring-0"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="age" className="technical-header ml-1">Idade Atual</Label>
              <div className="nm-inset">
                <Input 
                  id="age" 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  min={18}
                  max={70}
                  className="bg-transparent border-none shadow-none focus-visible:ring-0 technical-value"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-black/5 dark:bg-white/5 py-3 px-6 flex justify-between items-center">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Faixa Etária</span>
            <span className="text-xs font-black text-[var(--primary)] uppercase">{ageGroup}</span>
          </CardFooter>
        </Card>

        {/* Tests Section */}
        <div className="grid md:grid-cols-2 gap-8 print:hidden">
          <Card className="nm-card border-none">
            <CardHeader className="pb-4 border-b border-white/10">
              <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Dumbbell className="w-4 h-4" /> Testes de Força
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="upperBody" className="technical-header">{upperBodyTestLabel}</Label>
                  <InfoTooltip text={getUpperBodyHelp(sex, age)} />
                </div>
                <div className={`nm-inset${fieldErrors.upperBody ? ' border border-red-400/60' : ''}`}>
                  <Input 
                    id="upperBody" 
                    type="number" 
                    placeholder="0" 
                    value={upperBodyValue}
                    onChange={(e) => { setUpperBodyValue(e.target.value); setFieldErrors(prev => { const n = {...prev}; delete n.upperBody; return n; }); }}
                    className="bg-transparent border-none shadow-none focus-visible:ring-0 technical-value text-lg"
                  />
                </div>
                {fieldErrors.upperBody && <p className="text-xs text-destructive mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldErrors.upperBody}</p>}
                {!fieldErrors.upperBody && fieldWarnings.upperBody && <p className="text-xs text-warning mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldWarnings.upperBody}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="abdominal" className="technical-header">Abdominal Remador</Label>
                  <InfoTooltip text="Repetições em 1 minuto." />
                </div>
                <div className={`nm-inset${fieldErrors.abdominal ? ' border border-red-400/60' : ''}`}>
                  <Input 
                    id="abdominal" 
                    type="number" 
                    placeholder="0" 
                    value={abdominalValue}
                    onChange={(e) => { setAbdominalValue(e.target.value); setFieldErrors(prev => { const n = {...prev}; delete n.abdominal; return n; }); }}
                    className="bg-transparent border-none shadow-none focus-visible:ring-0 technical-value text-lg"
                  />
                </div>
                {fieldErrors.abdominal && <p className="text-xs text-destructive mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldErrors.abdominal}</p>}
                {!fieldErrors.abdominal && fieldWarnings.abdominal && <p className="text-xs text-warning mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldWarnings.abdominal}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="nm-card border-none">
            <CardHeader className="pb-4 border-b border-white/10">
              <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Activity className="w-4 h-4" /> Resistência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="run" className="technical-header">Corrida 12 min (m)</Label>
                  <InfoTooltip text="Distância total em metros." />
                </div>
                <div className={`nm-inset${fieldErrors.run ? ' border border-red-400/60' : ''}`}>
                  <Input 
                    id="run" 
                    type="number" 
                    placeholder="0" 
                    value={runValue}
                    onChange={(e) => { setRunValue(e.target.value); setFieldErrors(prev => { const n = {...prev}; delete n.run; return n; }); }}
                    className="bg-transparent border-none shadow-none focus-visible:ring-0 technical-value text-lg"
                  />
                </div>
                {fieldErrors.run && <p className="text-xs text-destructive mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldErrors.run}</p>}
                {!fieldErrors.run && fieldWarnings.run && <p className="text-xs text-warning mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldWarnings.run}</p>}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 px-1">
                  <Checkbox 
                    id="swim-check" 
                    checked={includeSwim} 
                    onCheckedChange={(checked) => setIncludeSwim(!!checked)} 
                    className="w-5 h-5 rounded-md border-none nm-btn"
                  />
                  <Label htmlFor="swim-check" className="text-xs font-bold uppercase tracking-widest cursor-pointer text-muted-foreground">
                    Incluir Natação 50m
                  </Label>
                </div>

                <AnimatePresence>
                  {includeSwim && (
                    <motion.div 
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between px-1">
                        <Label htmlFor="swim" className="technical-header">Natação (s)</Label>
                        <InfoTooltip text="Tempo em segundos para 50m." />
                      </div>
                      <div className={`nm-inset${fieldErrors.swim ? ' border border-red-400/60' : ''}`}>
                        <Input 
                          id="swim" 
                          type="number" 
                          placeholder="0" 
                          value={swimValue}
                          onChange={(e) => { setSwimValue(e.target.value); setFieldErrors(prev => { const n = {...prev}; delete n.swim; return n; }); }}
                          className="bg-transparent border-none shadow-none focus-visible:ring-0 technical-value text-lg"
                        />
                      </div>
                      {fieldErrors.swim && <p className="text-xs text-destructive mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldErrors.swim}</p>}
                      {!fieldErrors.swim && fieldWarnings.swim && <p className="text-xs text-warning mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 flex-shrink-0" />{fieldWarnings.swim}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 print:hidden">
          <motion.div className="flex-1" whileTap={{ scale: 0.97 }} transition={{ duration: 0.1, ease: EASE_OUT_QUINT }}>
            <Button 
              onClick={handleCalculate} 
              className="w-full nm-btn-primary h-16 text-sm font-black uppercase tracking-[0.25em]"
            >
              Calcular Resultado <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} transition={{ duration: 0.1, ease: EASE_OUT_QUINT }}>
            <Button 
              variant="outline" 
              onClick={handleReset} 
              className="nm-btn w-14 h-16 rounded-xl border-none"
              aria-label="Limpar formulário"
            >
              <span ref={resetIconRef} className="flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE_OUT_QUINT }}
            >
              <Card 
                role="button"
                tabIndex={0}
                aria-label="Ver tabelas de referência detalhadas"
                className="border-none overflow-hidden cursor-pointer group relative hover:scale-[1.005] transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 !py-0 !gap-0"
                style={{ background: '#021859' }}
                onClick={() => setIsModalOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsModalOpen(true); } }}
              >
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-60 transition-opacity text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>

                {/* Score principal */}
                <div className="px-6 sm:px-10 pt-8 pb-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Score Final TAF</span>
                    <div className="flex items-end gap-4 flex-wrap">
                      <span className="text-7xl sm:text-9xl font-black tracking-tighter text-white leading-none">
                        {displayScore}
                      </span>
                      <motion.div
                        key={results.concept}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_QUINT, delay: 0.15 }}
                        className={`mb-2 px-4 py-2 rounded-lg text-sm font-black uppercase tracking-widest relative overflow-hidden ${getConceptBadge(results.concept)}${results.concept === 'EXCELENTE' ? ' badge-excelente' : ''}`}
                      >
                        {results.concept}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Breakdown por modalidade */}
                <div className="border-t border-white/10">
                  <div className={`grid grid-cols-2 ${results.swim !== undefined ? 'md:grid-cols-4' : 'md:grid-cols-3'} divide-x divide-y md:divide-y-0 divide-white/10`}>
                    <div className="p-4 md:p-6 flex flex-col gap-1">
                      <span className="text-xs uppercase font-bold text-white/40">Força</span>
                      <span className="text-xl font-black technical-value text-white">{results.upperBody.toFixed(1)}</span>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col gap-1">
                      <span className="text-xs uppercase font-bold text-white/40">Abdominal</span>
                      <span className="text-xl font-black technical-value text-white">{results.abdominal.toFixed(1)}</span>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col gap-1">
                      <span className="text-xs uppercase font-bold text-white/40">Corrida</span>
                      <span className="text-xl font-black technical-value text-white">{results.run.toFixed(1)}</span>
                    </div>
                    {results.swim !== undefined && (
                      <div className="p-4 md:p-6 flex flex-col gap-1">
                        <span className="text-xs uppercase font-bold text-white/40">Natação</span>
                        <span className="text-xl font-black technical-value text-white">{results.swim.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Aprovado / Reprovado */}
                <div className="bg-white/5 p-6">
                  <div className="flex items-center gap-3 w-full">
                    {results.final < 5.0 ? (
                      <>
                        <motion.div
                          key={`reprovado-${results.final}`}
                          className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE_OUT_QUINT, delay: 0.5 }}
                        >
                          <AlertCircle className="w-6 h-6" />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black uppercase tracking-widest text-red-400">Reprovado</span>
                          <span className="text-xs text-white/40">Abaixo da média mínima exigida (5.0)</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          key={`aprovado-${results.final}`}
                          className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE_OUT_QUINT, delay: 0.5 }}
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Aprovado</span>
                          <span className="text-xs text-white/40">Conforme Instrução Reguladora 001/2024</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
              <div className="mt-4 flex justify-end print:hidden">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="nm-btn border-none flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  aria-label="Imprimir resultado"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-12 text-xs text-muted-foreground space-y-4 border-t border-white/10 pt-8 pb-12 print:hidden">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <span className="uppercase font-bold tracking-widest">IR 001/2024</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="uppercase font-bold tracking-widest">CBMRS</span>
            </div>
          </div>
          <p className="leading-relaxed text-center italic">
            "O desempate conservador arredonda para a pontuação inferior. Resultados abaixo do mínimo resultam em 0,0 pontos."
          </p>
        </footer>
      </div>

      {/* Tables Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl lg:max-w-5xl max-h-[90vh] max-sm:max-h-[85dvh] overflow-y-auto nm-card border-none p-0 max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-full max-sm:rounded-b-none max-sm:rounded-t-2xl">
          <DialogHeader className="p-4 sm:p-8 pb-4">
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-[var(--primary)]">
              <TableIcon className="w-8 h-8" /> Tabelas de Referência
            </DialogTitle>
            <DialogDescription className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
              Valores oficiais para pontuação (IR 001/2024)
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-4 sm:px-8 pb-4 sm:pb-8">
            <Tabs defaultValue="upperBody" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4 sm:mb-6 nm-inset p-1 !h-auto">
                <TabsTrigger value="upperBody" className="text-xs font-black uppercase py-3 data-[active]:nm-btn data-[active]:bg-[var(--surface)]">Força Sup.</TabsTrigger>
                <TabsTrigger value="abdominal" className="text-xs font-black uppercase py-3 data-[active]:nm-btn data-[active]:bg-[var(--surface)]">Abdominal</TabsTrigger>
                <TabsTrigger value="run" className="text-xs font-black uppercase py-3 data-[active]:nm-btn data-[active]:bg-[var(--surface)]">Corrida</TabsTrigger>
                <TabsTrigger value="swim" className="text-xs font-black uppercase py-3 data-[active]:nm-btn data-[active]:bg-[var(--surface)]">Natação</TabsTrigger>
              </TabsList>
              
              <div className="nm-inset p-1 rounded-2xl overflow-hidden">
                <TabsContent value="upperBody" className="m-0 bg-[var(--surface)] rounded-xl p-4">
                  <ScoringTableDisplay 
                    title={upperBodyTestLabel}
                    table={getUpperBodyTable(sex, age)}
                    currentPoints={results?.upperBody ?? 0}
                    ageGroup={ageGroup}
                  />
                </TabsContent>
                
                <TabsContent value="abdominal" className="m-0 bg-[var(--surface)] rounded-xl p-4">
                  <ScoringTableDisplay 
                    title="Abdominal Remador (1 min)"
                    table={getAbdominalTable(sex)}
                    currentPoints={results?.abdominal ?? 0}
                    ageGroup={ageGroup}
                  />
                </TabsContent>
                
                <TabsContent value="run" className="m-0 bg-[var(--surface)] rounded-xl p-4">
                  <ScoringTableDisplay 
                    title="Corrida 12 min (Metros)"
                    table={getRunTable(sex)}
                    currentPoints={results?.run ?? 0}
                    ageGroup={ageGroup}
                  />
                </TabsContent>
                
                <TabsContent value="swim" className="m-0 bg-[var(--surface)] rounded-xl p-4">
                  <ScoringTableDisplay 
                    title="Natação 50m (Segundos)"
                    table={getSwimTable(sex)}
                    currentPoints={results?.swim ?? 0}
                    ageGroup={ageGroup}
                    lowerIsBetter
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

const ScoringTableDisplay = memo(function ScoringTableDisplay({ 
  title, 
  table, 
  currentPoints, 
  ageGroup,
  lowerIsBetter = false
}: { 
  title: string; 
  table: ScoringTable; 
  currentPoints: number;
  ageGroup: string;
  lowerIsBetter?: boolean;
}) {
  const points = Object.keys(table).map(Number).sort((a, b) => b - a);
  const ageIndex = AGE_GROUPS.indexOf(ageGroup as any);

  return (
    <div className="space-y-4">
      <h3 className="font-black uppercase text-xs tracking-widest text-muted-foreground border-b border-white/10 pb-2">{title}</h3>
      <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent sticky top-0 z-10 bg-[var(--surface)]">
              <TableHead className="w-16 sm:w-20 technical-header sticky left-0 z-20 bg-[var(--surface)] shadow-[1px_0_0_0_rgba(255,255,255,0.08)]">Pts</TableHead>
              {AGE_GROUPS.map((group) => (
                <TableHead 
                  key={group} 
                  className={`text-center technical-header min-w-[52px] sm:min-w-[70px] ${group === ageGroup ? 'text-[var(--primary)] font-black bg-[var(--primary)]/5' : ''}`}
                >
                  {group}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {points.map((p) => {
              const pStr = p.toFixed(1);
              const isActiveRow = p === currentPoints;
              return (
                <TableRow 
                  key={pStr} 
                  className={`border-none hover:bg-white/5 dark:hover:bg-black/5 ${isActiveRow ? 'bg-[var(--primary)]/10' : ''} transition-colors rounded-lg`}
                >
                  <TableCell className={`technical-value font-black text-xs sticky left-0 z-10 shadow-[1px_0_0_0_rgba(255,255,255,0.08)] ${isActiveRow ? 'bg-[var(--primary)]/10' : 'bg-[var(--surface)]'}`}>{pStr}</TableCell>
                  {table[pStr].map((val, idx) => (
                    <TableCell 
                      key={idx} 
                      className={`text-center technical-value text-xs ${idx === ageIndex ? (isActiveRow ? 'text-[var(--primary)] font-black' : 'text-[var(--primary)]/60') : 'text-muted-foreground'}`}
                    >
                      {val === 0 ? '-' : (lowerIsBetter ? `≤${val}` : `≥${val}`)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </div>
  );
});

function InfoTooltip({ text }: { text: string }) {
  return (
    <Popover>
      <PopoverTrigger className="p-4 -m-4 opacity-40 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:rounded transition-opacity">
        <Info className="w-3 h-3" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-64 p-4 bg-[var(--text)] text-[var(--bg)] text-xs font-bold uppercase tracking-widest rounded-xl shadow-2xl border-none"
      >
        {text}
      </PopoverContent>
    </Popover>
  );
}

function getUpperBodyHelp(sex: Sex, age: number): string {
  if (sex === 'M') {
    return age <= 39 
      ? "Pegada em pronação, braços estendidos. Flexionar cotovelos até o queixo passar a barra. Sem embalo."
      : "Corpo ereto, mãos no solo. Flexionar cotovelos até o nível das escápulas. Tronco retilíneo.";
  } else {
    return age <= 39
      ? "Pegada em pronação. Manter-se suspensa com o queixo acima da barra pelo maior tempo possível."
      : "Apoio sobre os joelhos. Flexionar cotovelos até o nível das escápulas. Pés em suspensão.";
  }
}
