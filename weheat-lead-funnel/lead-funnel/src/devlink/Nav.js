"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Nav.module.css";

export function Nav({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "nav")} tag="div">
      <_Builtin.HtmlEmbed value="%3C!--%20Google%20Tag%20Manager%20(noscript)%20--%3E%0A%3Cnoscript%3E%3Ciframe%20src%3D%22https%3A%2F%2Fwww.googletagmanager.com%2Fns.html%3Fid%3DGTM-W5VXJ8D%22%20height%3D%220%22%20width%3D%220%22%20style%3D%22display%3Anone%3Bvisibility%3Ahidden%22%3E%3C%2Fiframe%3E%3C%2Fnoscript%3E%0A%3C!--%20End%20Google%20Tag%20Manager%20(noscript)%20--%3E" />
      <_Builtin.Block
        className={_utils.cx(_styles, "container", "hspread")}
        tag="div"
      >
        <_Builtin.Heading className={_utils.cx(_styles, "heading-2")} tag="h1">
          {"Digitaleschouw.com"}
        </_Builtin.Heading>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cookieconsent")}
        tag="div"
        id="cookie-consent"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-block-2")}
          tag="div"
        >
          {
            "We gebruiken cookies om ervoor te zorgen dat we je de beste ervaring bieden op onze website. Door gebruik te blijven maken van deze site, ga je ermee akkoord dat we cookies gebruiken."
          }
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "button-3", "black")}
          button={true}
          id="accept-cookies"
          block=""
          options={{
            href: "#",
          }}
        >
          {"Accepteren"}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
