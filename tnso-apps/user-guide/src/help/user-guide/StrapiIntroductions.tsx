/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect, useCallback } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { StrapiApp } from '../../interfaces/user-guide/user-guide';
import ReactMarkdown from 'react-markdown';
import { environment } from '../../config/environments';
import { getIntroductions } from '../../service/user-guide/strapi-introduccion';
import { useNavigate } from 'react-router-dom';
import { TNSOButton, TNSOCard, Variants } from '@tnso/ui-components/dist';

const StrapiIntroductions = (): JSX.Element => {
  const [data, setData] = useState<StrapiApp[]>([]);
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate('/help/userGuide/');
  }, [navigate]);

  const handleSection = useCallback(() => {
    navigate('/help/userGuide/monitoring');
  }, [navigate]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const userGuides = await getIntroductions();
        setData(userGuides);
      } catch (error) {
        console.error('Error fetching user guides:', error);
      }
    };
    fetchData().catch((error) => {
      console.error('Error in fetchData promise:', error);
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
            <Breadcrumb.Item
              active
              aria-current="page"
              className="breadCrumb hand-cursor"
            >
              Introduction
            </Breadcrumb.Item>
          </Breadcrumb>
        </nav>
        <div className="">
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <div style={{ marginBottom: '3rem' }}>
                  <h5>{item.attributes.title}</h5>
                  <ReactMarkdown>
                    {item.attributes.description.replace(
                      /!\[image\]\(([^)]+)\)/g,
                      `![image](${environment.API_URL_STRAPI}$1)`
                    )}
                  </ReactMarkdown>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-end align-items-end">
          <TNSOButton
            variant={Variants.Primary}
            className="mx-4 mb-1"
            onClick={handleSection}
          >
            Next
          </TNSOButton>
        </div>
      </TNSOCard>
    </div>
  );
};

export default StrapiIntroductions;
