using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using DAL;
using System.Linq;
using BLL;
using System.Web.Http.Cors;

namespace ten10ServerSide.Controllers
{
    [RoutePrefix("api/Questions")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class QuestionsController : ApiController
    {
        DB db = new DB();
        public IEnumerable<DAL.Question> Get()
        {
            using (questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Questions.ToList();
            }
        }
        public DAL.Teacher Get(int id)
        {
            using (questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Teachers.FirstOrDefault(e => e.questionnaire == id);
            }
        }
        [Route("SaveQuestionsForTeacher")]
        [HttpPost]
        public bool SaveQuestionsForTeacher([FromBody]BLL.Teacher teacher)
        {
            db.SaveQuestionnaire(teacher);
            return true;

        }
        //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        [Route("GetSubjects")]
        [HttpGet]
        public List<string> GetSubjects()
        {
            return db.GetSubjectsFromTeachersTable();
        }
        //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        [Route("GetListOfSubject")]
        [HttpPost]
        public List<DAL.Teacher> GetListOfSubject(string subject)
        {
            return db.GetListOfSubjectFromTable(subject);
        }
        [Route("GetQuestionsList")]
        [HttpPost]
        public List<DAL.Question> GetQuestionsList(int questionaire)
        {
            return db.GetQuestionsListFromTable(questionaire);
        }
    }
}