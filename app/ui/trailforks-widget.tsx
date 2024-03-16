import Script from "next/script";

export default function TrailforksWidget() {
  return (
    <div className="h-96 w-96">
      <Script
        type="application/javascript"
        src="https://es.pinkbike.org/326/sprt/j/trailforks/iframeResizer.min.js"
      ></Script>
      <Script
        id="TrailforksWidget"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            var script = document.createElement("script");
            script.setAttribute("src", "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js");
            document.getElementsByTagName("head")[0].appendChild(script);
            var widgetCheck = false;
        `,
        }}
      />
      <div
        className="TrailforksTrailList"
        data-w="420px"
        data-h="420px"
        data-rid="4922"
        data-displaytype="table"
        data-activitytype="5"
        data-season="0"
        data-unsanctioned="0"
        data-query=""
      ></div>
      powered by <a href="https://www.trailforks.com/">Trailforks.com</a>
    </div>
  );
}
