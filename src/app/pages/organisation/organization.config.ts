type Page = {
  title: string,
  tabs: [
    {
      title: string,
      wizardtabs: WizardTab[]
    }
  ]
};
type WizardTab =
  {
    tabName: string,
    formData: []
  }


const organization: Array<Page> = [{
  title: 'Subsidiary',
  tabs: [
    {
      title: 'Subsidiary',
      wizardtabs: [
        {
          tabName: 'Subsidiary',
          formData: []
        },
        {
          tabName: 'Review',
          formData: []
        },
      ]
    }
  ]
},
{
  title: 'Jurisdiction',
  tabs: [
    {
      title: 'Jurisdiction',
      wizardtabs: [
        {
          tabName: 'Jurisdiction',
          formData: []
        },
        {
          tabName: 'Review',
          formData: []
        },
      ]
    }
  ]
},
{
  title: 'Announcements',
  tabs: [
    {
      title: 'Announcements',
      wizardtabs: [
        {
          tabName: 'Announcements',
          formData: []
        },
        {
          tabName: 'Channels',
          formData: []
        },
        {
          tabName: 'Review',
          formData: []
        },
      ]
    }
  ]
}
];
export {organization ,Page}