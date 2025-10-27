
import Consulta from '../assets/image/consultando.png'
import Vacina from '../assets/image/seringa.png'
import Exame from '../assets/image/exame-de-prostata.png'
import Press from '../assets/image/monitor-de-pressao-sanguinea.png'
export const agenda = [
  {
    id: 1,
    icon:Consulta,
    description:'Marque suas consultas, exames e procedimentos na UBS',
    Servico: 'Cosulta',
    data: '2025-10-01',
    hora: '09:00',
    disponibilidade: true,
    triagem: {
    primeiraVezUBS: false,
    emJejum: true,
    picosRecentes: false, 
    observacaoAdicional: '',
    },
  },
    {
    id: 2,
    icon:Vacina,
    description:'Consulte a disponibilidade das\ndoses e proteja-se contra \nas doenças sazonais.',
    Servico: 'Vacina',
    data: '2025-10-01',
    hora: '08:00',
    disponibilidade: true,
    triagem: {
    primeiraVezUBS: false,
    emJejum: true,
    picosRecentes: false, 
    observacaoAdicional: '',
  },
  },
    {
    id: 3,
    icon:Exame,
    description:'Agende seu check-up de próstata\n anual para homens acima de \n40 anos.',
    Servico: 'Exame de Próstata',
    data: '2025-10-01',
    hora: '12:00',
    disponibilidade: true,
    triagem: {
    primeiraVezUBS: false,
    emJejum: true,
    picosRecentes: false, 
    observacaoAdicional: '',
  },
  },
    {
    id: 4,
    icon:Press,
    description:'Uma aferição rapida com \nacompanhamento  profissional ',
    Servico: 'Medição de pressão/\nGlicose',
    data: '2025-10-01',
    hora: '12:00',
    disponibilidade: true,
    triagem: {
    primeiraVezUBS: false,
    emJejum: true,
    picosRecentes: false, 
    observacaoAdicional: '',
    },
  },
  
  
];