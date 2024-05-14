const WidgetLayout = [
    {id: 'widget1', x: 0, y: 0, w: 3, h: 4},
    {id: 'widget2', x: 3, y: 0, w: 3, h: 4},
    {id: 'widget3', x: 6, y: 0, w: 6, h: 4},
    {id: 'widget4', x: 0, y: 4, w: 6, h: 5},
    {id: 'widget5', x: 6, y: 4, w: 6, h: 5},
    {id: 'widget6', x: 0, y: 9, w: 6, h: 9},
    {id: 'widget7', x: 6, y: 9, w: 6, h: 9},
    {id: 'widget8', x: 0, y: 18, w: 12, h: 12},
]
const WidgetSizes = [
  {
    id:'widget1',
    sizes:{
      sm: { w: 3 , h: 4},
      md: { w: 4 , h: 4},
      lg: { w: 6 , h: 4},
    }
  },
  {
    id:'widget2',
    sizes:{
      sm: { w: 3 , h: 4},
      md: { w: 4 , h: 4},
      lg: { w: 6 , h: 4},
    }
  },
  {
    id:'widget3',
    sizes:{
      sm: { w: 4 , h: 4},
      md: { w: 6 , h: 4},
      lg: { w: 8 , h: 4},
    }
  },
  {
    id:'widget4',
    sizes:{
      sm: { w: 4 , h: 5},
      md: { w: 6 , h: 5},
      lg: { w: 8 , h: 5},
    }
  },
  {
    id:'widget5',
    sizes:{
      sm: { w: 4 , h: 5},
      md: { w: 6 , h: 5},
      lg: { w: 8 , h: 5},
    }
  },
  {
    id:'widget6',
    sizes:{
      sm: { w: 6 , h: 9},
      md: { w: 8 , h: 9},
      lg: { w: 12 , h: 9},
    }
  },
  {
    id:'widget7',
    sizes:{
      sm: { w: 6 , h: 9},
      md: { w: 8 , h: 9},
      lg: { w: 12 , h: 9},
    }
  },
  {
    id:'widget8',
    sizes:{
      sm: { w: 6 , h: 12},
      md: { w: 8 , h: 12},
      lg: { w: 12 , h: 12},
    }
  }
]

const CardData : { name: string; role: string; selected: boolean; }[] =  [
    { name: "Farhan Ahmed", role: "HR Manager", selected: false },
    { name: "Alan Johnson", role: "Developer", selected: false },
    { name: "Robert Doe", role: "Marketing", selected: false },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false },
    { name: "Alan Johnson", role: "Developer", selected: false },
    { name: "Robert Doe", role: "Marketing", selected: false },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false },
    { name: "Alan Johnson", role: "Developer", selected: false },
    { name: "Robert Doe", role: "Marketing", selected: false },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false },
    { name: "Alan Johnson", role: "Developer", selected: false },
    { name: "Robert Doe", role: "Marketing", selected: false },
    { name: "Karina Clark", role: "UI/UX Designer", selected: false },
  ];
type QuickCardMeta = {
    id:string;
    content?: string;
    name: string;
    backgroundColor: string;
    backgroundImage: string;
    selected?: boolean;
    sequence?:number;
}
const quickCardsMetaData: QuickCardMeta[] = [
  {
    id: 'onboard-pending',
    name: 'Onboarding Pending',
    backgroundColor: ' #01BEA1',
    backgroundImage: './assets/media/widgets-background/widget-shape1.svg'
  },
  {
    id: 'leave-request',
    name: 'Leave Requests',
    backgroundColor: '#4D4E8D',
    backgroundImage: './assets/media/widgets-background/widget-shape3.svg'
  },
  {
    id: 'people-on-leave',
    name: 'People on leave',
    backgroundColor: '#4DB7FE',
    backgroundImage: './assets/media/widgets-background/widget-shape4.svg'
  },


  {
    id: 'next-payroll-date',
    name: 'Next Payroll Date',
    backgroundColor: '#F3A23A',
    backgroundImage: './assets/media/widgets-background/widget-shape2.svg'
  },
  {
    id: 'employee-turn-over',
    name: 'Employee Turnover',
    backgroundColor: '#F1416C',
    backgroundImage: './assets/media/widgets-background/widget-shape5.svg'
  }
];
export { QuickCardMeta, WidgetLayout, WidgetSizes, quickCardsMetaData };

