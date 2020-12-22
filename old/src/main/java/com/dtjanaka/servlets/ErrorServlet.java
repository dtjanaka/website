package com.dtjanaka.servlets;

import com.dtjanaka.*;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Handles errors and exceptions.
 */
@WebServlet("/error")
public class ErrorServlet extends HttpServlet {

  /**
   * Handles GET requests for errors.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    processError(request, response);
  }

  /**
   * Handles POST requests for errors.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  protected void doPost(HttpServletRequest request,
                        HttpServletResponse response)
      throws ServletException, IOException {
    processError(request, response);
  }

  /**
   * Responds with information about errors and exceptions thrown during
   * runtime.
   * @param     {HttpServletRequest}    request
   * @param     {HttpServletResponse}   response
   * @return    {void}
   */
  private void processError(HttpServletRequest request,
                            HttpServletResponse response) throws IOException {
    response.setContentType("text/html");

    String code = request.getParameter("code");
    if (!DataUtils.isEmptyParameter(code)) {
      response.getWriter().println(
          "<head>"
          +
          "<meta name='viewport' content='width=device-width, initial-scale=1.0' />"
          + "<meta charset='UTF-8' />"
          + "<title>Dylon Tjanaka | Error " + code + "</title>"
          +
          "<link rel='icon' href='/images/pfps/pfp_def_circular.ico' type='image/x-icon' />"
          +
          "<link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap' rel='stylesheet' />"
          +
          "<link rel='stylesheet' href='style.css' /></head><body><div id='content'><h1>" +
          code + "</h1>");
      switch (code) {
      case "404":
        response.getWriter().println("<p>Page not found.</p></div>");
        return;
      case "500":
        response.getWriter().println("<p>Internal server error.</p></div>");
        return;
      default:
        response.getWriter().println(
            "<p>Something unexpected occurred.</p></div></body>");
        return;
      }
    }

    Throwable throwable =
        (Throwable)request.getAttribute("javax.servlet.error.exception");
    Integer statusCode =
        (Integer)request.getAttribute("javax.servlet.error.status_code");
    String servletName =
        (String)request.getAttribute("javax.servlet.error.servlet_name");
    if (DataUtils.isEmptyParameter(servletName)) {
      servletName = "Unknown";
    }
    String requestUri =
        (String)request.getAttribute("javax.servlet.error.request_uri");
    if (DataUtils.isEmptyParameter(requestUri)) {
      requestUri = "Unknown";
    }

    response.getWriter().println(
        "<head>"
        +
        "<meta name='viewport' content='width=device-width, initial-scale=1.0' />"
        + "<meta charset='UTF-8' />"
        + "<title>Dylon Tjanaka | Error " + statusCode + "</title>"
        +
        "<link rel='icon' href='/images/pfps/pfp_def_circular.ico' type='image/x-icon' />"
        +
        "<link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap' rel='stylesheet' />"
        +
        "<link rel='stylesheet' href='style.css' /></head><body><div id='content'><h1>" +
        statusCode + "</h1>"
        + "<p>" + throwable.getMessage() + "</p>"
        + "<p>"
        + "on " + servletName + "</p>"
        + "<p>"
        + "when accessing " + requestUri + "</p></div>");
  }
}