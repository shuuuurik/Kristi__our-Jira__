import { FC } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { LoginModal } from '../../components/LoginModal';

import styles from './styles.module.scss';
import { Register } from '../../components/Register/Register';

export const Login: FC = () => {
  return (
    <PageLayout>
      <div className={styles.Login}><Register /></div>
    </PageLayout>
  );
};
