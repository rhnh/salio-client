import NavBar from "../components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

render(
  <Router>
    <NavBar />
  </Router>
);

describe("basic Look/function regardless of condition", () => {
  const home = screen.getByText(/^home/i);
  const about = screen.getByText(/^about/i);
  const contact = screen.getByText(/^contacts$/i);
  test("valid", () => {
    //home
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute("href", "/");
    //about
    expect(about).toBeInTheDocument();
    expect(about).toHaveClass("nav-right");
    expect(about).toHaveAttribute("href", "/about");

    //contact
    expect(contact).toBeInTheDocument();
    expect(contact).toHaveAttribute("href", "/contacts");
  });
});
