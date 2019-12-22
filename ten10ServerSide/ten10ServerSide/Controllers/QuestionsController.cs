using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using DAL;
using System.Linq;


namespace ten10ServerSide.Controllers
{
    public class QuestionsController : ApiController
    {
      
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
    }
}
