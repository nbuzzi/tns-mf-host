import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { environment } from "../../config/environments";
import { getLvc } from "../../service/user-guide/user-guide-service";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StrapiApp } from "../../interfaces/user-guide/user-guide";
import { TNSOButton, TNSOCard, Variants } from "@tnso/ui-components/dist";

const StrapiLvc = (): JSX.Element => {
  const [data, setData] = useState<StrapiApp[]>([]);
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate("/help/userGuide/");
  }, [navigate]);

  const handleSection = useCallback(() => {
    navigate("/help/userGuide/details");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const userGuides = await getLvc();
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
            LVC
          </Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <div className=" d-md-flex mb-2" />
      <div className="">
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <h5>{item.attributes.title}</h5>
              <ReactMarkdown>{item.attributes.description.replace(/!\[image\]\(([^)]+)\)/g, `![image](${environment.API_URL_STRAPI}$1)`)}</ReactMarkdown>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <div className="d-flex">
          <TNSOButton variant={Variants.Primary} className="mx-4 mb-1" onClick={handleSection}>
            Back
          </TNSOButton>
        </div>
      </div>
      </TNSOCard>
    </div>
  );
};

export default StrapiLvc;
