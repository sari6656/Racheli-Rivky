using System.Collections.Generic;
using System.Web.Http;
using DAL;
namespace ten10ServerSide.Controllers
{
    public class QuestionsController : ApiController
    {
        public IEnumerable<Questions> Get()
        {
            using(questionnaireEntities entities = new questionnaireEntities())
            {
                return entities.Questions.questionDesc.toList();
            }
        }
    }
}
