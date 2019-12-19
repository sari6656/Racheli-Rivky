using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ten10project.Controllers
{
    public class myController : ApiController
    {
        public string Get(string ttttt)
        {
            return ttttt;
        }
    }
}
