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
        questionnaireEntities entities = new questionnaireEntities();
        public List<string> GetSubjectsFromTeachersTable()
        {
            return entities.Teachers.Select(s => s.subject).ToList();
        }
        public List<Teachers> GetListOfSubjectFromTable(string subject)
        {
            return entities.Teachers.Where(i => i.subject == subject).ToList();
        }
        public List<Questions> GetQuestionsListFromTable(int questionaire)
        {
            return entities.Questions.Where(y => y.questionnaire == questionaire).ToList();
        }
        public bool SaveQuestionnaire(Teacher teacher)
        {
            //שאלון חדש
            if (teacher.Id == 0)
            {
                int nextQuestionnaireId = entities.Teachers.Max(x => x.questionnaire) + 1;
                Teachers newTeacher = new Teachers
                {
                    @class = teacher.Class,
                    matter = teacher.Matter,
                    questionnaire = nextQuestionnaireId,
                    subject = teacher.Subject,
                    teacherName = teacher.TeacherName
                };

                foreach (var item in teacher.QuestionsList)
                {
                    Questions question = new Questions{
                        answer1 = item.Answer1,
                        answer2 = item.Answer2,
                        answer3 = item.Answer3,
                        questionDesc = item.Description,
                        correctAnswer = item.CorrectAnswer.ToString(),
                        questionnaire = nextQuestionnaireId
                    };
                    entities.Questions.Add(question);
                }
                entities.Teachers.Add(newTeacher);
                try{
                    entities.SaveChanges();
                }
                catch(Exception e)
                {
                throw e;
                }
            }
            return true;
        }
    }
}
