import IRole from './IRole'

export default interface ICreateRoleDTO extends Pick<IRole, 'name'> {}
