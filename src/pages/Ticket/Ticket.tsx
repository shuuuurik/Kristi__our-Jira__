import { FC, useEffect } from 'react';
import { Comment as CommentType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useGetRequest } from '../../hooks/useGetRequest';
import { RootState } from '../../redux/store';
import { ticketActions } from '../../redux/features/ticketSlice';
import { Header } from '../../components/Header';
import { PageLayout } from '../../components/PageLayout';
import { IssueInfo } from '../../components/IssueInfo';
import { Comment } from '../../components/Comment';

import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

export const Ticket: FC = () => {
  const { idBoard, idTicket } = useParams();
  const dispatch = useDispatch();

  const issue = useSelector((state: RootState) => state.ticket.value);

  const { data: issueData, isLoading: isIssueLoading } = useGetRequest(`${idBoard}/issues/${idTicket}`);

  useEffect(() => {
    if (issueData && !isIssueLoading) {
      dispatch(ticketActions.setTicket(issueData));
    }
  }, [issueData, isIssueLoading]);

  return (
    <div className={styles.Ticket}>
      <Header />
      <PageLayout>
        <div className={styles.Ticket__blocks}>
          <div className={styles.Ticket__top}>
            <div>
              <span className={styles['Ticket__top-projectName']}>Project name</span>
            </div>
            <div className={styles['Ticket__top-controls']}>
              <Button text="Edit" type="primary" />
              <Button text="Comment" type="primary" />
            </div>
          </div>
          <IssueInfo {...issue} />
          <div className={styles.Ticket__comments}>
            <div className={styles['Ticket__comments-header']}>
              <span>Comments</span>
            </div>
            <div className={styles['Ticket__comments-content']}>
              {issue.comments.map((comment: CommentType) => (
                <Comment key={comment.id} {...comment} />
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};
