import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Shield, Lock, Unlock, User, Database, 
  AlertTriangle, CheckCircle, RefreshCw, KeyRound, 
  Wifi, Cpu, Laptop, Landmark, Volume2, VolumeX, Info, ShieldCheck, Eye, EyeOff
} from 'lucide-react';

const levels = [
  {
    id: 1,
    targetName: "Marcos Silva",
    dossier: "Bio do Twitter: Palmeirense roxo! \n\nPost recente no Instagram: 'Foto no Allianz Parque. Aquele título da Libertadores de 1999 foi o momento mais feliz da minha vida! #Obsessão'",
    password: "Palmeiras1999",
    hints: [
      "O alvo é fanático por futebol.",
      "Ele menciona um time e o ano de uma conquista histórica."
    ]
  },
  {
    id: 2,
    targetName: "Sandra Regina",
    dossier: "Veterinária. No Instagram, posta muito sobre sua cadela Golden Retriever. \n\nPost fixado: 'Hoje faz 3 anos que essa princesa chamada Mel chegou! #Adoção #2018'. \n\nNota técnica interceptada: O banco exige um caractere especial no final das senhas e ela adora usar exclamação.",
    password: "Mel2018!",
    hints: [
      "A senha gira em torno do animal de estimação da Sandra.",
      "Ela junta o nome da cadela com o ano em que a adotou."
    ]
  },
  {
    id: 3,
    targetName: "Lucas Oliveira",
    dossier: "Estudante de TI e gamer. Nick no fórum: 'PokeMaster99'. \n\nPostou em tom saudoso: 'Meu primeiro jogo foi no GameBoy, eu era obcecado pelo Pikachu'. \n\nNota técnica interceptada: Ele costuma substituir a letra 'i' pelo número '1' (leet speak) e finaliza suas senhas com '@'.",
    password: "P1kachu@",
    hints: [
      "A senha envolve a criatura favorita dele do GameBoy.",
      "Substitua a letra 'i' de 'Pikachu' pelo número '1'."
    ]
  },
  {
    id: 4,
    targetName: "Patrícia Lima",
    dossier: "Concurseira. No blog, seu 'Sobre Mim' diz: 'Meu grande objetivo de vida é a Posse na Receita Federal. 2024 é o meu ano!'. \n\nNo Twitter, ela só usa hashtags sobre estudos. \n\nNota técnica interceptada: Ela finaliza suas senhas pessoais com '#'.",
    password: "Posse2024#",
    hints: [
      "A senha foca no maior objetivo profissional dela.",
      "Junte a palavra central do objetivo com o ano em que ela planeja alcançá-lo."
    ]
  },
  {
    id: 5,
    targetName: "Roberto Dias",
    dossier: "Executivo. A foto de capa do Facebook dele é a Torre Eiffel com a legenda: 'Lembrança inesquecível da nossa lua de mel em 2015. O lugar mais lindo do mundo: Paris'. \n\nNota técnica interceptada: O caractere especial padrão que ele usa no final de todas as senhas é '@'.",
    password: "Paris2015@",
    hints: [
      "Qual é a cidade que marcou a lua de mel do Roberto?",
      "Combine o nome da cidade com o ano da viagem."
    ]
  },
  {
    id: 6,
    targetName: "Carlos Alberto",
    dossier: "Corretor veterano. Bio no site da empresa: 'Fundei a C.A. Imóveis há 30 anos no mesmo endereço: Avenida Amazonas, número 1420'. \n\nNo Facebook, ele reclama publicamente que as senhas modernas são difíceis de decorar e prefere usar termos do seu cotidiano de trabalho.",
    password: "Amazonas1420",
    hints: [
      "Carlos usa o nome da rua onde trabalha e o número do endereço.",
      "Combine o nome da avenida (apenas a palavra principal) com o número da casa."
    ]
  },
  {
    id: 7,
    targetName: "Fernanda Costa",
    dossier: "Chef de Cozinha. Inaugurou o restaurante 'Sabor & Arte' em 2019. \n\nEm entrevista recente para um blog gastronômico, declarou: 'Sou obcecada por ervas frescas. O Alecrim define a minha cozinha, coloco em quase tudo'.",
    password: "Alecrim2019",
    hints: [
      "A senha envolve a erva preferida da chef Fernanda.",
      "Junte esse ingrediente secreto com o ano de abertura do restaurante dela."
    ]
  },
  {
    id: 8,
    targetName: "Daniel Souza",
    dossier: "Analista de sistemas e músico. No Twitter postou uma foto de uma guitarra antiga e desgastada com a legenda: 'Minha primeira paixão. Ganhei essa Fender quando fiz 13 anos e nunca mais parei de tocar'. \n\nNota técnica interceptada: A senha dele contém apenas letras e números, sem caracteres especiais.",
    password: "Fender13",
    hints: [
      "Daniel usa a marca da sua primeira guitarra.",
      "Ele combina essa marca com a idade em que ganhou o instrumento."
    ]
  },
  {
    id: 9,
    targetName: "Ricardo Mendes",
    dossier: "Engenheiro. No Instagram, a bio diz: 'Casado com Mariana | Pai do Enzo'. O post mais recente é de 2022, segurando o pezinho de um bebê recém-nascido. \n\nNota técnica interceptada: Ele usa suas próprias iniciais (ambas em maiúsculas), seguidas do nome do filho e do ano de nascimento dele em formato de dois dígitos.",
    password: "RMEnzo22",
    hints: [
      "Inicie com as letras maiúsculas das iniciais de Ricardo Mendes.",
      "Adicione o nome do filho dele."
    ]
  },
  {
    id: 10,
    targetName: "Beatriz Silva",
    dossier: "Ativista ambiental. Escreveu um artigo no blog listando desastres ecológicos históricos que não podem ser esquecidos: Mariana, Brumadinho e Chernobyl (1986). \n\nNo Twitter, comentou: 'A minissérie sobre Chernobyl mudou completamente a minha vida política'.",
    password: "Chernobyl1986",
    hints: [
      "O foco da senha é o desastre que mais impactou a Beatriz.",
      "Junte a grafia correta da cidade russa com o ano em que o evento ocorreu."
    ]
  }
];

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [gameState, setGameState] = useState('boot'); // 'boot' | 'playing' | 'transition' | 'finished'
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [visibleCharsCount, setVisibleCharsCount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const audioCtxRef = useRef(null);
  const consoleEndRef = useRef(null);
  const [consoleLogs, setConsoleLogs] = useState([]);

  const currentLevel = levels[currentLevelIndex];
  const activeDossierText = currentLevel ? currentLevel.dossier.slice(0, visibleCharsCount) : '';
  const unlockedHintsCount = Math.min(currentLevel ? currentLevel.hints.length : 0, Math.floor(secondsElapsed / 60));

  // Initialize balance and typewriter effect for dossier
  useEffect(() => {
    if (gameState === 'playing' && currentLevel) {
      // Generate unique random balance for this target
      const balanceVal = (Math.random() * (950000 - 14500) + 14500).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      setCurrentBalance(balanceVal);

      // Reset character count for typewriter
      setVisibleCharsCount(0);
      let count = 0;
      const totalLength = currentLevel.dossier.length;
      
      const interval = setInterval(() => {
        count++;
        setVisibleCharsCount(count);
        // Subtle key typing sound (random high frequency click)
        if (soundEnabled && Math.random() > 0.4) {
          playBeep(800 + Math.random() * 400, 'sine', 0.003, 0.01);
        }
        if (count >= totalLength) {
          clearInterval(interval);
        }
      }, 12);

      // Add log
      addLog(`Conectando ao banco de dados do alvo: ${currentLevel.targetName}...`, 'info');
      addLog(`Capturando pacotes de dados públicos. OSINT inicializada...`, 'info');

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentLevelIndex, gameState]);

  // Track elapsed seconds in the current level for hint release
  useEffect(() => {
    if (gameState === 'playing') {
      setSecondsElapsed(0);
      const timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentLevelIndex, gameState]);

  // Audio helper
  const playBeep = (frequency, type = 'sine', duration = 0.1, gainValue = 0.05) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.value = frequency;
      gainNode.gain.setValueAtTime(gainValue, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context error", e);
    }
  };

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, { text, type, timestamp }]);
  };

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  const handleInvasionAttempt = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (inputValue === currentLevel.password) {
      // Correct password
      playBeep(523.25, 'triangle', 0.15, 0.1); // C5
      setTimeout(() => playBeep(659.25, 'triangle', 0.15, 0.1), 100); // E5
      setTimeout(() => playBeep(783.99, 'triangle', 0.3, 0.1), 200); // G5

      setErrorMessage('');
      setGameState('transition');
      setShowHint(false);
      setHintIndex(0);

      if (currentLevelIndex === levels.length - 1) {
        addLog(`Senha correta para Beatriz Silva. Autenticação primária bypassada.`, 'success');
        addLog(`[ALERTA] Bloqueio de Segurança: Autenticação de Dois Fatores (2FA) ativa!`, 'error');
      } else {
        addLog(`Bypass completo na camada de autenticação. Acesso autorizado para ${currentLevel.targetName}!`, 'success');
        
        // Auto-progress to next phase after 3.5 seconds
        setTimeout(() => {
          setCurrentLevelIndex((prev) => prev + 1);
          setInputValue('');
          setGameState('playing');
        }, 3500);
      }
    } else {
      // Wrong password
      playBeep(180, 'sawtooth', 0.2, 0.15); // Low buzzer
      setTimeout(() => playBeep(180, 'sawtooth', 0.2, 0.15), 100);

      setErrorMessage("Acesso Negado. Tente outra combinação.");
      addLog(`Falha na autenticação do alvo ${currentLevel.targetName}. Credencial inválida.`, 'error');
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Click sound when typing
    playBeep(600, 'sine', 0.005, 0.02);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const getNextHint = () => {
    if (unlockedHintsCount === 0) return;
    playBeep(440, 'sine', 0.05, 0.05);
    if (!showHint) {
      setShowHint(true);
      setHintIndex(0);
      addLog(`Solicitada pista operacional de OSINT nível 1.`, 'warning');
    } else if (hintIndex < unlockedHintsCount - 1) {
      setHintIndex((prev) => prev + 1);
      addLog(`Solicitada pista operacional de OSINT nível ${hintIndex + 2}.`, 'warning');
    } else {
      setShowHint(false);
      setHintIndex(0);
      addLog(`Painel de dicas ocultado.`, 'info');
    }
  };

  const restartGame = () => {
    playBeep(330, 'sine', 0.1, 0.05);
    setTimeout(() => playBeep(440, 'sine', 0.1, 0.05), 100);
    setCurrentLevelIndex(0);
    setInputValue('');
    setGameState('playing');
    setErrorMessage('');
    setShowHint(false);
    setHintIndex(0);
    setSecondsElapsed(0);
    setConsoleLogs([]);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-mono relative overflow-hidden terminal-scanline terminal-grid-bg selection:bg-cyan-500 selection:text-black">
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur z-50 px-4 py-3 sticky top-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-950 border border-cyan-500/40 p-1.5 rounded">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-cyan-400 uppercase">OSINT Command Terminal</h1>
              <p className="text-xs text-slate-500">Módulo de Dinâmica e Phishing v1.2.0</p>
            </div>
          </div>

          {gameState === 'playing' && (
            <div className="flex items-center gap-4">
              {/* Progress indicators */}
              <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
                <span className="text-cyan-400 font-bold">Fase:</span>
                <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-cyan-300 font-bold">
                  {currentLevelIndex + 1} / {levels.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {levels.map((lvl, index) => (
                  <div 
                    key={lvl.id} 
                    className={`w-4 h-2 rounded-sm transition-all duration-300 ${
                      index < currentLevelIndex 
                        ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                        : index === currentLevelIndex 
                        ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sound Controls */}
          <button 
            onClick={toggleSound} 
            className="flex items-center gap-2 text-xs border border-slate-800 hover:border-slate-700 bg-slate-900/40 px-3 py-1.5 rounded cursor-pointer transition text-slate-400 hover:text-slate-200"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ÁUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span>MUTADO</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main container */}
      <main className="flex-1 flex flex-col justify-center p-4 max-w-6xl mx-auto w-full z-10 my-4 md:my-8">
        
        {gameState === 'boot' && (
          <div className="max-w-2xl mx-auto w-full border border-cyan-500 bg-slate-950/95 backdrop-blur-md rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(6,182,212,0.15)] border-glow-cyan min-h-[460px]">
            <div>
              <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3 mb-6">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-widest">
                  <Cpu className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>[ SISTEMA DE CONEXÃO DO RED TEAM ]</span>
                </div>
                <span className="text-[10px] bg-red-950 border border-red-500/30 text-red-400 px-2 py-0.5 rounded font-bold animate-pulse">
                  SYSTEM READY
                </span>
              </div>

              <div className="bg-slate-950 border border-cyan-500/10 rounded p-4 text-xs text-cyan-500/80 min-h-[220px] font-mono flex flex-col gap-2 no-scrollbar overflow-y-auto mb-6">
                <div className="text-cyan-400 font-bold">&gt; INICIALIZANDO ESTAÇÃO DE TRABALHO OSINT...</div>
                <div>[OK] NÚCLEO DE CRIPTOGRAFIA CARREGADO: v2.4.1</div>
                <div>[OK] MÓDULO DE DECODIFICAÇÃO DE SENHAS: PRONTO [AES / RSA]</div>
                <div>[OK] TÚNEL PROXY VPN SEGURO ATIVADO [12 DISTRIBUÍDOS]</div>
                <div>[INFO] ALVOS DE ENGENHARIA SOCIAL SELECIONADOS: 10 ALVOS</div>
                <div className="text-emerald-400 font-semibold animate-pulse">&gt; DIRETRIZ: LEIA OS DOSSIÊS DAS VÍTIMAS PARA SE APROPRIAR DAS SENHAS</div>
                <div className="text-slate-500 border-t border-slate-900 pt-2 mt-2 leading-relaxed">
                  Bem-vindo, Agente. Esta simulação educativa avalia a vulnerabilidade de senhas humanas comuns contra OSINT (Open Source Intelligence). Use pistas extraídas das vidas das vítimas para simular invasões bancárias.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playBeep(440, 'sine', 0.15, 0.08);
                setTimeout(() => playBeep(880, 'sine', 0.3, 0.08), 100);
                setGameState('playing');
                addLog("Iniciando operação de infiltração nos bancos de dados de alvos.", "warning");
              }}
              className="w-full bg-cyan-950 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black py-4 rounded font-bold uppercase tracking-widest text-sm transition duration-300 flex items-center justify-center gap-3 cursor-pointer border-glow-cyan"
            >
              <Terminal className="w-5 h-5 animate-pulse" />
              <span>Conectar ao Servidor de Alvos</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Dossier Card Panel */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="border border-cyan-500/30 bg-slate-900/40 backdrop-blur-md rounded-lg p-5 flex flex-col justify-between flex-grow border-glow-cyan">
                <div>
                  <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-widest">
                      <User className="w-4 h-4" />
                      <span>[ DADOS INTERCEPTADOS DO ALVO ]</span>
                    </div>
                    <span className="text-[10px] bg-cyan-950 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded font-bold">
                      SECURE SOURCE
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs text-slate-500 block mb-1">NOME DO ALVO:</span>
                    <span className="text-xl font-extrabold text-cyan-300 tracking-wide glow-cyan">
                      {currentLevel.targetName}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block mb-1">DOSSIÊ E PISTAS:</span>
                    <div className="bg-slate-950/80 border border-cyan-500/15 p-4 rounded text-sm text-cyan-100 leading-relaxed font-mono min-h-[160px] whitespace-pre-line relative no-scrollbar max-h-[350px] overflow-y-auto">
                      <div className="absolute top-2 right-2 flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                        <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      </div>
                      
                      {/* Render text with proper line breaks */}
                      {activeDossierText}
                      <span className="inline-block w-2.5 h-4 bg-cyan-400 ml-1 terminal-blink" />
                    </div>
                  </div>
                </div>

                {/* Hints panel inside dossier */}
                <div className="mt-5 border-t border-slate-800/80 pt-4">
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                    {unlockedHintsCount === 0 ? (
                      <button
                        disabled
                        className="px-4 py-2 text-xs border border-slate-800 bg-slate-950/60 rounded text-slate-500 font-bold cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Lock className="w-3.5 h-3.5 animate-pulse" />
                        <span>Pistas Bloqueadas ({60 - secondsElapsed}s)</span>
                      </button>
                    ) : (
                      <button
                        onClick={getNextHint}
                        className="px-4 py-2 text-xs border border-cyan-500/20 bg-cyan-950/30 hover:bg-cyan-500 hover:text-black rounded text-cyan-400 font-bold cursor-pointer transition flex items-center justify-center gap-2 border-glow-cyan"
                      >
                        <Info className="w-3.5 h-3.5" />
                        {showHint ? `VER PISTA (${hintIndex + 1}/${unlockedHintsCount})` : `OBTER PISTA (${unlockedHintsCount} DISPONÍVEL)`}
                      </button>
                    )}
                    
                    <span className="text-[10px] text-slate-400 text-center sm:text-right font-mono">
                      {unlockedHintsCount < (currentLevel ? currentLevel.hints.length : 0) ? (
                        `Próxima dica liberada em: ${60 - (secondsElapsed % 60)}s`
                      ) : (
                        "Todas as pistas da fase foram liberadas."
                      )}
                    </span>
                  </div>

                  {showHint && unlockedHintsCount > 0 && (
                    <div className="mt-3 bg-cyan-950/20 border border-cyan-500/30 p-3 rounded text-xs text-cyan-300 leading-relaxed flex gap-2">
                      <span className="text-cyan-400 font-bold">INFO:</span>
                      <p>{currentLevel.hints[hintIndex]}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Terminal Hacker Panel */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="border border-emerald-500/30 bg-slate-900/40 backdrop-blur-md rounded-lg p-5 flex flex-col justify-between flex-grow border-glow-green">
                <div>
                  <div className="flex justify-between items-center border-b border-emerald-500/20 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-widest">
                      <Database className="w-4 h-4" />
                      <span>[ TERMINAL DE INVASÃO ]</span>
                    </div>
                    <span className="text-[10px] bg-emerald-950 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-bold">
                      EXPLOIT READY
                    </span>
                  </div>

                  {/* Terminal console logs */}
                  <div className="bg-slate-950/80 border border-emerald-500/10 rounded p-3 text-[11px] text-emerald-500/80 mb-5 min-h-[140px] max-h-[180px] overflow-y-auto no-scrollbar font-mono flex flex-col gap-1.5">
                    {consoleLogs.map((log, i) => (
                      <div key={i} className={`flex items-start gap-1 ${
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'success' ? 'text-emerald-300 font-bold' : 
                        log.type === 'warning' ? 'text-cyan-300' : 'text-emerald-500/70'
                      }`}>
                        <span className="text-slate-600">[{log.timestamp}]</span>
                        <span>{log.text}</span>
                      </div>
                    ))}
                    <div ref={consoleEndRef} />
                  </div>

                  {/* Input password form */}
                  <form onSubmit={handleInvasionAttempt} className="space-y-4">
                    <div>
                      <label htmlFor="password-input" className="text-xs text-slate-500 block mb-1">
                        DIGITE A SENHA DO ALVO:
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-emerald-500/60 font-bold text-sm select-none">
                          $ &gt;
                        </span>
                        <input
                          id="password-input"
                          type={passwordVisible ? "text" : "password"}
                          value={inputValue}
                          onChange={handleInputChange}
                          autoComplete="off"
                          placeholder="Digite a combinação..."
                          className="w-full bg-slate-950 border border-emerald-500/40 text-emerald-400 pl-8 pr-10 py-3 rounded focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 placeholder-emerald-800/50 font-mono text-base tracking-wide"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-3 text-emerald-500/40 hover:text-emerald-400 cursor-pointer"
                        >
                          {passwordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="bg-red-950/20 border border-red-500/30 text-red-400 text-xs p-3 rounded flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 animate-bounce" />
                        <span className="font-bold glow-red">{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className={`w-full py-3 rounded font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition duration-300 ${
                        inputValue.trim() 
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black cursor-pointer border-glow-green' 
                          : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Tentar Invasão</span>
                    </button>
                  </form>
                </div>

                <div className="mt-5 border-t border-slate-800/80 pt-4 text-[10px] text-slate-500 flex justify-between">
                  <span>DISPOSITIVO: SECURE_VIRTUAL_BOX</span>
                  <span>IP: 192.168.1.{100 + currentLevelIndex}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Transition State (Success Screen) */}
        {gameState === 'transition' && (
          currentLevelIndex === levels.length - 1 ? (
            <div className="max-w-xl mx-auto w-full border border-red-500 bg-slate-950/90 backdrop-blur-md rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(239,68,68,0.15)] border-glow-red relative min-h-[400px]">
              <div className="absolute inset-0 bg-red-500/[0.02] pointer-events-none rounded-lg" />
              
              <div className="w-16 h-16 bg-red-950/50 border-2 border-red-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <Shield className="w-8 h-8 text-red-400 animate-pulse" />
              </div>

              <h2 className="text-2xl font-extrabold text-red-400 tracking-wider mb-2 uppercase glow-red">
                Invasão Impedida!
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-sm">
                Senha de Beatriz Silva está correta. No entanto, o acesso foi bloqueado por segurança.
              </p>

              <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded mb-6 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-500">BARREIRA DE SEGURANÇA:</span>
                  <span className="text-red-400 font-bold">Autenticação em Duas Etapas (2FA)</span>
                </div>
                <div className="text-slate-400 leading-relaxed">
                  Um código temporário de verificação (OTP) foi enviado via app autenticador ao celular cadastrado de <strong>Beatriz Silva</strong>. 
                  Sem o dispositivo físico ou engenharia social ativa direta (Phishing de 2FA), é impossível concluir a invasão bancária.
                </div>
              </div>

              <button
                onClick={() => {
                  setGameState('finished');
                  addLog("Simulação de invasões concluída. Relatório de conscientização gerado.", "success");
                  playBeep(880, 'sine', 0.5, 0.1);
                }}
                className="w-full bg-red-950/80 border border-red-500 hover:bg-red-500 hover:text-black text-red-400 py-3.5 rounded font-bold uppercase tracking-widest text-xs transition duration-300 flex items-center justify-center gap-2 cursor-pointer border-glow-red mt-2"
              >
                <CheckCircle className="w-4.5 h-4.5" />
                <span>Gerar Relatório e Finalizar</span>
              </button>
            </div>
          ) : (
            <div className="max-w-xl mx-auto w-full border border-emerald-500 bg-slate-950/90 backdrop-blur-md rounded-lg p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] border-glow-green relative min-h-[400px]">
              <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none rounded-lg" />
              
              <div className="w-16 h-16 bg-emerald-950/50 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Unlock className="w-8 h-8 text-emerald-400 animate-bounce" />
              </div>

              <h2 className="text-2xl font-extrabold text-emerald-400 tracking-wider mb-2 uppercase glow-emerald">
                Acesso Concedido!
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-sm">
                Conexão com a rede de dados bancários estabelecida com sucesso. Executando script de drenagem...
              </p>

              <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded mb-6 text-left space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                  <span className="text-slate-500">CONTA COMPROMETIDA:</span>
                  <span className="text-cyan-400 font-bold">{currentLevel.targetName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">SALDO TRANSFERIDO:</span>
                  <span className="text-emerald-400 font-extrabold text-sm tracking-wider glow-green">
                    R$ {currentBalance}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-emerald-500/80 font-bold">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Avancando para o próximo alvo do dossiê...</span>
              </div>
            </div>
          )
        )}

        {/* Game Finished (Victory Dashboard) */}
        {gameState === 'finished' && (
          <div className="max-w-3xl mx-auto w-full border border-cyan-500 bg-slate-950/90 backdrop-blur-md rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_60px_rgba(6,182,212,0.15)] border-glow-cyan">
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-cyan-950/50 border-2 border-cyan-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-widest uppercase mb-2 glow-cyan">
                Missão Cumprida
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Parabéns! Sua equipe penetrou com sucesso todos os alvos simulados usando apenas técnicas de engenharia social (OSINT).
              </p>
            </div>

            {/* Simulated Statistics Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded text-center">
                <span className="text-[10px] text-slate-500 block mb-1">ALVOS INVADIDOS:</span>
                <span className="text-xl font-bold text-cyan-300">9 / 10</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded text-center">
                <span className="text-[10px] text-slate-500 block mb-1">BLOQUEIOS POR 2FA:</span>
                <span className="text-xl font-bold text-red-400">1 / 10</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded text-center">
                <span className="text-[10px] text-slate-500 block mb-1">TAXA DE SUCESSO DO 2FA:</span>
                <span className="text-xl font-bold text-emerald-400 glow-green">100% Eficaz</span>
              </div>
            </div>

            {/* Educational takeaway */}
            <div className="bg-slate-900/40 border border-cyan-500/20 p-5 rounded-lg mb-8 text-sm text-slate-300 space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Lições Aprendidas de Segurança da Informação</span>
              </h3>
              <p className="leading-relaxed text-xs">
                As pessoas tendem a criar senhas baseadas em elementos de fácil memorização, como o nome de seus 
                animais de estimação, times do coração, datas comemorativas, hobbies ou informações profissionais expostas nas redes sociais.
                No entanto, a simulação demonstrou a importância vital do <strong>Múltiplo Fator de Autenticação (2FA)</strong>. 
                Mesmo quando um atacante consegue inferir a senha correta (como no caso de Beatriz Silva), o 2FA bloqueou a invasão com sucesso.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="flex gap-2 items-start">
                  <span className="text-red-400 font-extrabold">✕</span>
                  <span className="text-slate-400">Evite usar a mesma senha em múltiplos serviços ou baseadas em dados públicos.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-emerald-400 font-extrabold">✓</span>
                  <span className="text-slate-400">Habilite sempre a Verificação de Duas Etapas (2FA) em suas contas para criar barreiras intransponíveis.</span>
                </div>
              </div>
            </div>

            <button
              onClick={restartGame}
              className="w-full bg-cyan-950 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black py-3 rounded font-bold uppercase tracking-widest text-xs transition duration-300 flex items-center justify-center gap-2 cursor-pointer border-glow-cyan"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reiniciar Simulação</span>
            </button>

          </div>
        )}

      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-3 text-[10px] text-slate-600 text-center z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 Red Team Academy. Dinâmica Educacional de Engenharia Social.</span>
          <span className="text-slate-500 font-bold">REDE ENCRIPTAÇÃO ATIVA // CONEXÃO RESTRITA</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
