import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const PrayerRequests: CollectionConfig = {
  slug: 'prayer-requests',
  admin: {
    useAsTitle: 'name',
    description: 'Prayer requests and lead captures from website visitors',
    defaultColumns: ['name', 'email', 'source', 'createdAt', 'isFollowedUp'],
  },
  access: {
    // Anyone can create (from chatbot/form), only authenticated can read/manage
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'source',
      label: 'Source',
      type: 'select',
      defaultValue: 'form',
      options: [
        { label: 'Chatbot', value: 'chatbot' },
        { label: 'Contact Form', value: 'form' },
        { label: 'Newsletter Signup', value: 'newsletter' },
        { label: 'Prayer Partner Form', value: 'prayer-partner' },
      ],
    },
    {
      name: 'message',
      label: 'Message / Prayer Request',
      type: 'textarea',
    },
    {
      name: 'locale',
      label: 'Language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Chinese', value: 'zh' },
      ],
    },
    {
      name: 'isFollowedUp',
      label: 'Followed Up',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check when staff has responded to this request',
      },
    },
  ],
  timestamps: true,
}
