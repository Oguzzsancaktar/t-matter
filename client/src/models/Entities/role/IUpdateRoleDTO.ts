import { IRole } from '@/models'

export default interface IUpdateRoleDTO extends Pick<IRole, '_id' | 'name' | 'status'> {}
