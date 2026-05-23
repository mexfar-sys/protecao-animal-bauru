/**
 * Sistema de Proteção e Bem-Estar Animal - Bauru
 * Arquivo principal da aplicação
 */

class AnimalProtectionSystem {
  private version: string = '1.0.0';
  private initialized: boolean = false;

  constructor() {
    this.log('Iniciando Sistema de Proteção Animal...');
  }

  /**
   * Inicializa o sistema
   */
  public initialize(): void {
    try {
      this.initialized = true;
      this.log('✓ Sistema iniciado com sucesso');
      this.displayInfo();
    } catch (error) {
      this.error(`Erro ao inicializar o sistema: ${error}`);
      throw error;
    }
  }

  /**
   * Exibe informações do sistema
   */
  private displayInfo(): void {
    console.log('\n' + '='.repeat(60));
    console.log('🐾 SISTEMA DE PROTEÇÃO E BEM-ESTAR ANIMAL - BAURU');
    console.log('='.repeat(60));
    console.log(`Versão: ${this.version}`);
    console.log(`Status: ${this.initialized ? 'Ativo ✓' : 'Inativo ✗'}`);
    console.log('='.repeat(60) + '\n');
  }

  /**
   * Log de informações
   */
  private log(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  /**
   * Log de erros
   */
  private error(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }

  /**
   * Retorna o status do sistema
   */
  public getStatus(): boolean {
    return this.initialized;
  }
}

// Instanciar e inicializar o sistema
const system = new AnimalProtectionSystem();
system.initialize();

export default AnimalProtectionSystem;
