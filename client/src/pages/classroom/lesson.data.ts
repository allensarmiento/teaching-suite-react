import { ISlide } from '../../components/slide/slide.component';

const LESSON: ISlide[] = [
  {
    number: 1,
    title: 'Title',
    items: [
      {
        content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
        component: 'ImageContent'
      },
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      },
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      },
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      },
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      },
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      },
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      }
    ],
    showInReview: true,
  },
  {
    number: 2,
    title: 'Questions',
    items: [
      {
        content: 'Question 1?',
        component: 'QuestionContent',
      },
      {
        content: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
        component: 'ImageContent'
      },
      {
        content: 'Question 2?',
        component: 'QuestionContent',
      },
    ],
    showInReview: true,
  }
];

export default LESSON;
