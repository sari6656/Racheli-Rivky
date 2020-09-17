using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class DB
    {
        int nextQuestionnaireId = 0;
        int nextIdTeacher = 0;
        questionnaireEntities entities = new questionnaireEntities();
        public List<string> GetSubjectsFromTeachersTable()
        {
            List<string> aSub = entities.Teachers.Select(s => s.subject).ToList();
            return aSub.Distinct().ToList();

        }
        public List<DAL.Teacher> GetListOfSubjectFromTable(string subject)
        {
            List<DAL.Teacher> t = entities.Teachers.Where(i => i.subject == subject).ToList();
            foreach (var item in t)
            {
                foreach (var h in item.Questions)
                {
                    h.answer1 = "";
                    h.answer2 = "";
                    h.answer3 = "";
                    h.correctAnswer = "";
                    h.questionDesc = "";
                    h.questionId = 0;
                    h.questionnaire = 0;
                    h.Teacher = null;
                }

            }
            return t;
        }
        public List<DAL.Question> GetQuestionsListFromTable(int questionaire)
        {
            List<DAL.Question> b = entities.Questions.Where(y => y.questionnaire == questionaire).ToList();
            foreach (var item in b)
            {
                item.Teacher = null;

            }
            return b;
        }
        public bool SaveQuestionnaire(Teacher teacher)
        {
            int questionnaireId;
            //שאלון חדש

            if (teacher.Id == 0)
            {
                DAL.Teacher newTeacher = new DAL.Teacher
                {
                    @class = teacher.Class,
                    matter = teacher.Matter,
                    subject = teacher.Subject,
                    teacherName = teacher.TeacherName
                };
                entities.Teachers.Add(newTeacher);
                try
                {
                    entities.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            questionnaireId = entities.Teachers.FirstOrDefault(w => w.matter == teacher.Matter && w.subject == teacher.Subject && w.teacherName == teacher.TeacherName && w.@class == teacher.Class).questionnaire;

            foreach (var item in teacher.QuestionsList)
            {
                DAL.Question question = new DAL.Question
                {
                    answer1 = item.Answer1,
                    answer2 = item.Answer2,
                    answer3 = item.Answer3,
                    questionDesc = item.Description,
                    correctAnswer = item.CorrectAnswer.ToString(),
                    questionnaire = questionnaireId
                };
                entities.Questions.Add(question);
            }

            try
            {
                entities.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }

            return true;
        }
    }
}
