package org.example.controller;

import com.google.gson.Gson;
import org.example.model.dao.UserDao;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json; charset=UTF-8");

        BufferedReader reader = req.getReader();
        Gson gson = new Gson();
        Map<String, String> body = gson.fromJson(reader, new com.google.gson.reflect.TypeToken<Map<String, String>>(){}.getType());

        String userId = body.get("userId");
        String password = body.get("password");

        UserDao dao = new UserDao();
        boolean success = dao.login(userId, password);

        Map<String, Object> result = new HashMap<>();
        result.put("success", success);

        resp.getWriter().write(gson.toJson(result));
    }
}
