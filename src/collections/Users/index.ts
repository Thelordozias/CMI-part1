import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

const isAdminOrSelf = ({ req: { user } }: any) => {
  if (!user) return false
  if (user.roles?.includes('super-admin') || user.roles?.includes('admin')) return true
  return { id: { equals: user.id } }
}

const isSuperAdmin = ({ req: { user } }: any) =>
  user?.roles?.includes('super-admin') || false

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: isSuperAdmin,
    delete: isSuperAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'super-admin: full access | admin: manage content | editor: create/edit only',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
