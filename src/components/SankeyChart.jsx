import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveSankey } from "@nivo/sankey";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const SankeyChart = () => {
  const { nodes, links } = useSelector((state) => state.flow);
  const { t } = useTranslation();

  const data = {
    nodes: (nodes || []).map((node) => ({
      id: node.id || "unknown",
      nodeColor: "blue",
      label: node.name || t("Unknown Node"),
    })),
    links: (links || []).map((link) => ({
      source: link.source || "unknown",
      target: link.target || "unknown",
      value: link.value || 0,
    })),
  };

  if (!data.nodes.length || !data.links.length) {
    return (
      <Box
        sx={{
          height: "500px",
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t("No data available")}
      </Box>
    );
  }

  return (
    <Box sx={{ height: "500px", mb: 4 }}>
      <ResponsiveSankey
        data={data}
        getNodeLabel={(node) => node.name}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: "category10" }}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeSpacing={24}
        nodeBorderWidth={1}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        linkBlendMode="multiply"
        enableLinkGradient
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
        animate
        tooltip={({ node, link }) => (
          <div
            style={{
              background: "red",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            {node ? (
              <div>
                <strong>{t(node.label || node.id)}</strong>
                <br />
                {t("Additional Info")}: {node.additionalInfo || t("N/A")}
              </div>
            ) : (
              <div>
                <strong>
                  {t(
                    nodes.find(n => n.id === link.source)?.name ||
                      link.source ||
                      "unknown"
                  )}{" "}
                  →{" "}
                  {t(
                    nodes.find(n => n.id === link.target)?.name ||
                      link.target ||
                      "unknown"
                  )}
                </strong>
                <br />
                {link.value}
              </div>
            )}
          </div>
        )}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: "left-to-right",
            itemsSpacing: 2,
            symbolSize: 14,
            symbolShape: "circle",
            itemTextColor: "#000",
          },
        ]}
      />
    </Box>
  );
};

export default SankeyChart;
