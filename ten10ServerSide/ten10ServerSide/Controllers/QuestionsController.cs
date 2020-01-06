using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using DAL;
using System.Linq;
using BLL;

namespace ten10ServerSide.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class QuestionsController : ApiController
    {
        DB db = new DB();
        public IEnumerable<DAL.Question> Get()
        {
            using(questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Questions.ToList();
            }
        }
        public DAL.Teacher Get(int id)
        {
            using (questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Teachers.FirstOrDefault(e=>e.questionnaire==id);
            }
        }

        [HttpPost]
        public bool SaveQuestionsForTeacher(BLL.Teacher teacher)
        {       
            db.SaveQuestionnaire(teacher);
            return true;

        }
        [HttpPost]
        public List<string> GetSubjects(bool x)
        {
            return db.GetSubjectsFromTeachersTable();
        }
        [HttpPost]
        public List<DAL.Teacher> GetListOfSubject(string subject)
        {
            return db.GetListOfSubjectFromTable(subject);
        }
        [HttpPost]
        public List<DAL.Question> GetQuestionsList(int questionaire)
        {
            return db.GetQuestionsListFromTable(questionaire);
        }
    }
}