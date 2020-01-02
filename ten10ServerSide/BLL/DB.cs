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
                    newTeacher.
                }

                entities.Teachers.Add(newTeacher);

                
            }

        }
    }
}
