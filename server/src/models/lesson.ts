import { postgresWrapper } from '../postgres-wrapper';

interface ILesson {
  id: string;
  user_id: string;
  title: string;
  created: string;
}

class Lesson {
  async find() {
    let lessons: Array<ILesson> = [];

    try {
      lessons = await postgresWrapper.db('lessons');
    } catch (err) {
      console.log(`Error getting lessons: ${err}`);
    }

    return lessons;
  }

  async findById(id: string) {
    let lessons: Array<ILesson> = [];

    try {
      lessons = await postgresWrapper.db('lessons').where({ id });
    } catch (err) {
      console.log(`Error getting lessons: ${err}`);
    }

    return lessons.length > 0 ? lessons[0] : null;
  }

  async build({ userId, title }: { userId: string, title: string }) {
    const trx = await postgresWrapper.db.transaction();

    let newLesson;

    try {
      const data = await trx('lessons')
        .insert({
          user_id: userId,
          title,
          created: new Date().toUTCString(),
        })
        .returning('*');
      
      newLesson = data[0];
    } catch (err) {
      await trx.rollback();
    }

    return newLesson;
  }
}

export const lesson = new Lesson();
