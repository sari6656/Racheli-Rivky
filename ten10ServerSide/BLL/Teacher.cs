using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class Teacher
    {
        public int Id { get; set; }
        public string TeacherName { get; set; }
        public string Subject { get; set; }
        public string Matter { get; set; }
        public string Class { get; set; }
        public int Questionnaire { get; set; }
        public List<Question> QuestionsList { get; set; }
    }
}
