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
        public IEnumerable<Questions> Get()
        {
            using(questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Questions.ToList();
            }
        }
        public Teachers Get(int id)
        {
            using (questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Teachers.FirstOrDefault(e=>e.questionnaire==id);
            }
        }

        [HttpPost]
        public bool SaveQuestionsForTeacher(Teacher teacher)
        {       
            db.SaveQuestionnaire(teacher);
            return true;

        }
    }
}