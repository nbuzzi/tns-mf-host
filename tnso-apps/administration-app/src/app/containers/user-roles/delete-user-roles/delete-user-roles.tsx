import styles from './delete-user-roles.module.scss';

/* eslint-disable-next-line */
export interface DeleteUserRolesProps {}

export function DeleteUserRoles(props: DeleteUserRolesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DeleteUserRoles!</h1>
    </div>
  );
}

export default DeleteUserRoles;
