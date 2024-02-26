/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { environment } from "../../config/environments";
import { getDeviceDetailsViews } from "../../service/user-guide/strapi-details";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";
import { TNSOButton, TNSOCard, Variants } from "@tnso/ui-components/dist";

const DetailStrapi = (): JSX.Element => {
  const [data, setData] = useState<StrapiApp[]>([]);
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate("/help/userGuide/");
  }, [navigate]);

  const handleSection = useCallback(() => {
    navigate("/help/userGuide/devices");
  }, [navigate]);

  const handleSectionNext = useCallback(() => {
    navigate("/help/userGuide/lvc");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const userGuides = await getDeviceDetailsViews();
        setData(userGuides);
      } catch (error) {
        console.error("Error fetching user guides:", error);
      }
    };
    fetchData().catch((error) => {
      console.error("Error in fetchData promise:", error);
    });
  }, []);

  return (
    <div className="guide-container d-flex flex-column">
      <h5 className="title-user-guide">User Guide</h5>
      <div className="divider mb-4" />
      <TNSOCard>
      <nav aria-label="breadcrumb" className="containerBreadCrumb">
        <Breadcrumb>
          <Breadcrumb.Item className="breadCrumb">
            <a onClick={goBack}>Index</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page" className="breadCrumb hand-cursor">
            Details
          </Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <div className=" d-md-flex mb-2" />
      <div className="">
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <div style={{ marginBottom: "3rem" }}>
                <span>{item.attributes.title}</span>
                <ReactMarkdown>{item.attributes.description.replace(/!\[image\]\(([^)]+)\)/g, `![image](${environment.API_URL_STRAPI}$1)`)}</ReactMarkdown>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <div className="d-flex justify-content-between align-items-end">
          <TNSOButton variant={Variants.Primary} className="mx-4 mb-1" onClick={handleSection}>
            Back
          </TNSOButton>
          <TNSOButton variant={Variants.Primary} className="mx-4 mb-1" onClick={handleSectionNext}>
            Next
          </TNSOButton>
        </div>
      </div>
      </TNSOCard>
    </div>
  );
};

export default DetailStrapi;
