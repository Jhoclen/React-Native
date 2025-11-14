
import Consulta from '../assets/image/consultando.png'
import Vacina from '../assets/image/seringa.png'
import Exame from '../assets/image/exame-de-prostata.png'
import Press from '../assets/image/monitor-de-pressao-sanguinea.png'
export const agenda = [
  {
    id: 1,
    icon:Consulta,
    description:'Marque suas consultas, exames e procedimentos na UBS',
    Servico: 'Consulta',
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
    Servico: 'Medição de Pressão/\nGlicose',
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

export const agendaMock = [
  // ===== MEDIÇÃO DE PRESSÃO/GLICOSE =====
  { id: 1, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-15', hora: '08:00', disponibilidade: true },
  { id: 2, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-15', hora: '08:30', disponibilidade: true },
  { id: 3, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-15', hora: '09:00', disponibilidade: false },
  { id: 4, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-15', hora: '16:00', disponibilidade: true },
  { id: 5, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-16', hora: '08:00', disponibilidade: true },
  { id: 6, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-16', hora: '14:00', disponibilidade: true },
  { id: 7, servico: 'Medição de Pressão/\nGlicose', data: '2025-01-17', hora: '10:00', disponibilidade: true },

  // ===== RENOVAÇÃO DE RECEITA =====
  { id: 8, servico: 'Consulta', data: '2025-01-15', hora: '09:00', disponibilidade: true },
  { id: 9, servico: 'Consulta', data: '2025-01-15', hora: '10:00', disponibilidade: false },
  { id: 10, servico: 'Consulta', data: '2025-01-15', hora: '14:00', disponibilidade: true },
  { id: 11, servico: 'Consulta', data: '2025-01-16', hora: '09:00', disponibilidade: true },
  { id: 12, servico: 'Consulta', data: '2025-01-16', hora: '15:00', disponibilidade: true },
  { id: 13, servico: 'Consulta', data: '2025-01-18', hora: '11:00', disponibilidade: true },
  { id: 14, servico: 'Consulta', data: '2025-01-18', hora: '13:00', disponibilidade: true },
  { id: 15, servico: 'Consulta', data: '2025-01-19', hora: '13:00', disponibilidade: true },
  { id: 16, servico: 'Consulta', data: '2025-01-20', hora: '13:00', disponibilidade: true },

  // ===== VACINA =====
  { id: 15, servico: 'Vacina', data: '2025-01-16', hora: '08:00', disponibilidade: true },
  { id: 16, servico: 'Vacina', data: '2025-01-16', hora: '09:00', disponibilidade: true },
  { id: 17, servico: 'Vacina', data: '2025-01-16', hora: '10:00', disponibilidade: true },
  { id: 18, servico: 'Vacina', data: '2025-01-17', hora: '08:00', disponibilidade: true },
  { id: 19, servico: 'Vacina', data: '2025-01-17', hora: '09:00', disponibilidade: true },

  // ===== EXAME DE PRÓSTATA =====
  { id: 20, servico: 'Exame de Próstata', data: '2025-01-18', hora: '12:00', disponibilidade: true },
  { id: 21, servico: 'Exame de Próstata', data: '2025-01-18', hora: '13:00', disponibilidade: true },
  { id: 22, servico: 'Exame de Próstata', data: '2025-01-19', hora: '10:00', disponibilidade: true },
];
// Função helper para pegar datas únicas de um serviço
export const getUniqueDates = (servico) => {
  const filtered = agendaMock.filter(item => item.servico === servico);
  const uniqueDates = [...new Set(filtered.map(item => item.data))];
  return uniqueDates.sort();
};


// Função helper para pegar horários de uma data específica
export const getTimeSlotsForDate = (servico, data) => {
  return agendaMock.filter(item => 
    item.servico === servico && item.data === data
  );
};
