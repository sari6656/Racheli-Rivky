using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data; // Required for using Dataset , Datatable and Sql  
using System.Data.SqlClient; // Required for Using Sql  
using System.Configuration; // for Using Connection From Web.config   

namespace DAL
{
   public class questions {
        private string conn = ConfigurationManager.ConnectionStrings["Mythreetier"].ToString();
        public void InsertUpdateDeleteSQLString(string sqlstring)
        {
            SqlConnection objsqlconn = new SqlConnection(conn);
            objsqlconn.Open();
            SqlCommand objcmd = new SqlCommand(sqlstring, objsqlconn);
            objcmd.ExecuteNonQuery();

        }

        public object ExecuteSqlString(string sqlstring)
        {
            SqlConnection objsqlconn = new SqlConnection(conn);
            objsqlconn.Open();
            DataSet ds = new DataSet();
            SqlCommand objcmd = new SqlCommand(sqlstring, objsqlconn);
            SqlDataAdapter objAdp = new SqlDataAdapter(objcmd);
            objAdp.Fill(ds);
            return ds;
        }
        public void AddNewCustomerDB(string custname, string custaddr, string custcountry, string custcity, string custincode)
        {
            DataSet ds = new DataSet();
            string sql = "INSERT into Customer (customer_name,customer_address,customer_country,customer_city,customer_pincode) VALUES ('" + custname + "','" + custaddr + "','" + custcountry + "','" + custcity + "','" + custincode + "')";
            InsertUpdateDeleteSQLString(sql);
        }

        public void UpdateCustomerDB(int custid, string custname, string custaddr, string custcountry, string custcity, string custincode)
        {
            DataSet ds = new DataSet();
            string sql = "Update Customer set customer_name='" + custname + "',customer_address = '" + custaddr + "',customer_country= '" + custcountry + "',customer_city = '" + custcity + "',customer_pincode = '" + custincode + "' Where customer_id = '" + custid + "' ";
            InsertUpdateDeleteSQLString(sql);
        }

        public void DeleteCustomerDB(int custid)
        {
            DataSet ds = new DataSet();
            string sql = "Delete From Customer Where customer_id = '" + custid + "' ";
            InsertUpdateDeleteSQLString(sql);
        }


        public object LoadCustomerDB()
        {
            DataSet ds = new DataSet();
            string sql = "SELECT * from Customer order by customer_id";
            ds = (DataSet)ExecuteSqlString(sql);
            return ds;
        }
    }
    }


