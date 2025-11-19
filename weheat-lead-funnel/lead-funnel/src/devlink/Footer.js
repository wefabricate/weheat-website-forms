"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-125":{"id":"e-125","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e50","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e50","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477542770},"e-127":{"id":"e-127","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-128"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e5d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e5d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477551306},"e-129":{"id":"e-129","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-130"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e4d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e4d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477555206},"e-131":{"id":"e-131","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e68","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e68","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477560158},"e-133":{"id":"e-133","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-134"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e6b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e6b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477564182},"e-135":{"id":"e-135","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e6c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e6c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477569010},"e-137":{"id":"e-137","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-138"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e72","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e72","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477573212},"e-139":{"id":"e-139","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-140"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e5c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e5c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477577417},"e-141":{"id":"e-141","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-142"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e4e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d24172c1-7b40-7359-8c67-df3d5baa1e4e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1690477581631}},"actionLists":{"a-3":{"id":"a-3","title":"scroll in","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"652e3fcbedefafa2ad08f87a|5e441430-1f93-8e69-c357-1ca8baed220f"},"yValue":10,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-3-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"652e3fcbedefafa2ad08f87a|5e441430-1f93-8e69-c357-1ca8baed220f"},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-3-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":150,"easing":[0.439,0.001,0.25,1],"duration":350,"target":{"useEventTarget":true,"id":"652e3fcbedefafa2ad08f87a|5e441430-1f93-8e69-c357-1ca8baed220f"},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-3-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":150,"easing":[0.439,0.001,0.25,1],"duration":350,"target":{"useEventTarget":true,"id":"652e3fcbedefafa2ad08f87a|5e441430-1f93-8e69-c357-1ca8baed220f"},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1690476418281}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Footer({ as: _Component = _Builtin.Section }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "footer")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.Link
          className={_utils.cx(_styles, "footer-logo-wrap")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "footer-logo")}
            data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e4d"
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://cdn.prod.website-files.com/652e3fcbedefafa2ad08f87d/652e3fcbedefafa2ad08f892_weheat%20logo.svg"
          />
        </_Builtin.Link>
        <_Builtin.Block
          className={_utils.cx(_styles, "footer-items")}
          data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e4e"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "items-wrapper")}
            id={_utils.cx(
              _styles,
              "w-node-d24172c1-7b40-7359-8c67-df3d5baa1e4f-5baa1e4a"
            )}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "h5")}
              id={_utils.cx(
                _styles,
                "w-node-d24172c1-7b40-7359-8c67-df3d5baa1e50-5baa1e4a"
              )}
              data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e50"
              tag="h2"
            >
              {"Support"}
            </_Builtin.Heading>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Bereken je besparing"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "/#veelgestelde-vragen",
              }}
            >
              {"Veelgestelde vragen"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Voor installateurs"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Over ons"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"Contact"}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "items-wrapper")}
            id={_utils.cx(
              _styles,
              "w-node-d24172c1-7b40-7359-8c67-df3d5baa1e5c-5baa1e4a"
            )}
            data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e5c"
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "h5")}
              id={_utils.cx(
                _styles,
                "w-node-d24172c1-7b40-7359-8c67-df3d5baa1e5d-5baa1e4a"
              )}
              data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e5d"
              tag="h2"
            >
              {"Adres"}
            </_Builtin.Heading>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "https://www.google.com/maps/dir//Weheat,+Wolverstraat+23,+5525+AR+Duizel/@51.3644919,5.294123,17z/data=!4m17!1m7!3m6!1s0x47c6cf0bb39359d5:0x867deb026f772d24!2sWeheat!8m2!3d51.3644919!4d5.2966979!16s%2Fg%2F11kq8fwp95!4m8!1m0!1m5!1m1!1s0x47c6cf0bb39359d5:0x867deb026f772d24!2m2!1d5.2966979!2d51.3644919!3e1?entry=ttu",
              }}
            >
              {"Wolverstraat 23"}
              <br />
              {"5525 AR Duizel"}
              <br />
              {"Nederland"}
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "footer-meta")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "footer-items")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "items-wrapper")}
              id={_utils.cx(
                _styles,
                "w-node-d24172c1-7b40-7359-8c67-df3d5baa1e67-5baa1e4a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "paragraph", "gray")}
                data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e68"
                tag="div"
              >
                {"WeHeat is part of"}
              </_Builtin.Block>
              <_Builtin.Link
                className={_utils.cx(_styles, "partner-link")}
                button={false}
                block="inline"
                options={{
                  href: "https://www.wefabricate.com/",
                  target: "_blank",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "partner-logo")}
                  data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e6b"
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://cdn.prod.website-files.com/652e3fcbedefafa2ad08f87d/652e3fcbedefafa2ad08f886_wefabricate%20logo.svg"
                />
              </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "items-wrapper")}
              id={_utils.cx(
                _styles,
                "w-node-d24172c1-7b40-7359-8c67-df3d5baa1e6c-5baa1e4a"
              )}
              data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e6c"
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "socials-wrap")}
                tag="div"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "social-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "social-icon")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://cdn.prod.website-files.com/652e3fcbedefafa2ad08f87d/652e3fcbedefafa2ad08f89c_twitter%20logo.svg"
                  />
                </_Builtin.Link>
                <_Builtin.Link
                  className={_utils.cx(_styles, "social-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "https://www.linkedin.com/company/weheatnl/",
                    target: "_blank",
                  }}
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "social-icon")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://cdn.prod.website-files.com/652e3fcbedefafa2ad08f87d/652e3fcbedefafa2ad08f88a_linkedin%20logo.svg"
                  />
                </_Builtin.Link>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "meta-wrapper")}
            data-w-id="d24172c1-7b40-7359-8c67-df3d5baa1e72"
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "mailto:contact@weheat.nl",
              }}
            >
              {"contact@weheat.nl"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "paragraph", "gray", "link")}
              button={false}
              block=""
              options={{
                href: "https://weheat.nl/assets/files/metaalunie-terms-and-conditions-2019-english.pdf",
                target: "_blank",
              }}
            >
              {"Algemene voorwaarden"}
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "paragraph", "gray")}
              tag="div"
            >
              {"Copyright 2023"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
