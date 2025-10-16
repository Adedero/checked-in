import type { NavigationMenuItem } from '@nuxt/ui';

export const mainLinks: NavigationMenuItem[] = [
  {
    label: 'About',
    icon: 'lucide:info',
    children: [
      {
        label: 'Why CheckedIn?',
        to: '/why-checked-in',
        icon: 'lucide:help-circle'
      },
      {
        label: 'Features',
        to: '/features',
        icon: 'lucide:list'
      },
      {
        label: 'How it Works',
        to: '/how-it-works',
        icon: 'lucide:settings'
      },
      {
        label: 'Team',
        to: '/team',
        icon: 'lucide:users'
      }
    ]
  },
  {
    label: 'Use Cases',
    icon: 'lucide:lightbulb',
    children: [
      {
        label: 'For Schools',
        to: '/use-cases/schools',
        icon: 'lucide:school'
      },
      {
        label: 'For Companies',
        to: '/use-cases/companies',
        icon: 'lucide:building'
      },
      {
        label: 'For Events',
        to: '/use-cases/events',
        icon: 'lucide:calendar'
      }
    ]
  },
  {
    label: 'Pricing',
    to: '/pricing',
    icon: 'lucide:file-text'
  },
  {
    label: 'FAQ',
    to: '/frequently-asked-questions',
    icon: 'lucide:help-circle'
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: 'lucide:mail'
  }
];
