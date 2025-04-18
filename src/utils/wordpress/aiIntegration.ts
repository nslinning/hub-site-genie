
import { toast } from "sonner";
import { DesignSpec } from "./githubIntegration";

export interface AIModelConfig {
  apiKey: string;
  model: "gemini-2.5" | "claude-3.7";
  endpoint?: string;
}

export interface AnalysisRequest {
  url: string;
  requirements: string;
  customerNotes?: string;
}

export interface DesignRequest {
  requirements: string;
  analysisResults: string;
  designPreferences?: {
    colorTheme?: string;
    style?: string;
    layoutPreference?: string;
  };
}

export interface CodeCheckRequest {
  code: string;
  purpose: string;
  requirements?: string;
}

export interface AIResponse<T> {
  data: T;
  rawResponse?: any;
  success: boolean;
  message?: string;
}

export class AIIntegration {
  private config: AIModelConfig;

  constructor(config: AIModelConfig) {
    this.config = config;
  }

  private async callAI<T>(prompt: string, systemMessage?: string): Promise<AIResponse<T>> {
    try {
      // Dette er en forenklet implementasjon som må erstattes med faktisk API-kall
      // Her simulerer vi et API-kall til den valgte AI-modellen
      
      console.log(`Kaller ${this.config.model} med prompt: ${prompt.substring(0, 50)}...`);
      
      if (!this.config.apiKey) {
        throw new Error("API-nøkkel mangler");
      }

      // Simluerer responstid fra API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dette er en mockup som må erstattes med faktiske API-kall
      const mockResponse = { 
        success: true,
        data: { result: "AI-generert innhold basert på prompt" } as unknown as T
      };
      
      return mockResponse;
    } catch (error) {
      console.error("AI API-feil:", error);
      toast.error(`Feil ved kall til ${this.config.model}`);
      return {
        success: false,
        data: {} as T,
        message: error instanceof Error ? error.message : "Ukjent feil"
      };
    }
  }

  async analyzeWebsite(request: AnalysisRequest): Promise<AIResponse<any>> {
    const prompt = `
      Analyser nettstedet på følgende URL: ${request.url}
      
      Kundens krav og ønsker:
      ${request.requirements}
      
      ${request.customerNotes ? `Tilleggsinformasjon fra kunden:\n${request.customerNotes}` : ''}
      
      Gi en detaljert analyse av nettstedet med følgende:
      1. Hovedstruktur og layout
      2. Fargepalett og visuell identitet
      3. Typografi og teksthierarki
      4. Hovedfunksjonalitet
      5. Sterke sider som bør bevares
      6. Svakheter som bør forbedres
      7. Anbefalinger for ny WordPress-implementasjon
    `;
    
    return this.callAI(prompt, "Du er en ekspert på nettside-analyse og WordPress-konvertering");
  }

  async generateDesignPlan(request: DesignRequest): Promise<AIResponse<DesignSpec>> {
    const prompt = `
      Generer en detaljert design-plan basert på følgende:
      
      Krav:
      ${request.requirements}
      
      Analyse-resultater:
      ${request.analysisResults}
      
      ${request.designPreferences ? `
      Design-preferanser:
      Fargetema: ${request.designPreferences.colorTheme || 'Ingen spesifikk preferanse'}
      Stil: ${request.designPreferences.style || 'Ingen spesifikk preferanse'}
      Layout: ${request.designPreferences.layoutPreference || 'Ingen spesifikk preferanse'}
      ` : ''}
      
      Returner en komplett design-spesifikasjon med:
      1. Fargepalett (primær, sekundær, aksent, tekst, bakgrunn)
      2. Typografi (overskrifter, brødtekst, font-familie, størrelser)
      3. Layout-struktur
      4. Nøkkelkomponenter som bør inkluderes
    `;
    
    return this.callAI<DesignSpec>(prompt, "Du er en erfaren web-designer som spesialiserer deg på WordPress-design");
  }

  async checkCode(request: CodeCheckRequest): Promise<AIResponse<any>> {
    const prompt = `
      Vurder følgende kode:
      
      \`\`\`
      ${request.code}
      \`\`\`
      
      Hensikt med koden:
      ${request.purpose}
      
      ${request.requirements ? `Krav eller kontekst:\n${request.requirements}` : ''}
      
      Gi tilbakemelding på:
      1. Kodekvalitet og struktur
      2. Potensielle feil eller problemer
      3. Ytelsesoptimaliseringer
      4. Forbedringsforslag
      5. WordPress-kompatibilitet
      
      Returner spesifikke kodesnutter for forbedringer der det er relevant.
    `;
    
    return this.callAI(prompt, "Du er en ekspert på WordPress-utvikling og kodeoptimalisering");
  }
}
