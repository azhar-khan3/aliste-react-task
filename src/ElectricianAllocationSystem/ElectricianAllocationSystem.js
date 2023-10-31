import React, { useState } from 'react';

const ElectricianAllocationSystem = () => {
  const [electricians, setElectricians] = useState([
    {
        name: 'Pranav',
        phoneNumber: '6161232524',
        zone: ['DELHI'],
        grievanceElectrician: true,
        maxSites: 3,
        assignedSites: 0,
      },
      {
        name: 'Sidharth',
        phoneNumber: '6161232524',
        zone: ['NOIDA', 'GHAZIABAD'],
        grievanceElectrician: false,
        maxSites: 3,
        assignedSites: 0,
      },
  
  ]);

  const [sites, setSites] = useState([
    {
      name: 'Site X',
      city: 'Noida',
      grievance: true,
      assignedElectrician: '',
      installationDate: '2023-01-04T00:00:00.000Z',
    },
    {
      name: 'Site Y',
      city: 'Delhi',
      grievance: false,
      assignedElectrician: '',
      installationDate: '2023-10-18T00:00:00.000Z',
    },
  ]);

  const assignElectricians = () => {
    const availableElectricians = [...electricians];

    sites.forEach((site) => {
      const matchingElectricians = availableElectricians.filter(
        (electrician) =>
          electrician.type === (site.grievance ? 'Grievance' : 'General') &&
          electrician.assignedSites < electrician.maxSites
      );

      if (matchingElectricians.length > 0) {
        const selectedElectrician = matchingElectricians[0];
        selectedElectrician.assignedSites++;
        site.assignedElectrician = selectedElectrician.name;
      }
    });

    setElectricians(availableElectricians);
    setSites([...sites]);
  };

  const handleDateChange = (index, newDate) => {
    const updatedSites = [...sites];
    updatedSites[index].installationDate = newDate;
    setSites(updatedSites);
  };

  return (
    <div>
      {sites.map((site, index) => (
        <div key={index}>
            
          <p>
            Site {site.name} in City {site.city} is scheduled for installation on {site.installationDate}
          </p>
          <label> <b>Change installation Date</b></label> &nbsp;&nbsp;
          <input
            type="date"
            value={site.installationDate}
            onChange={(e) => handleDateChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={assignElectricians}>Auto Assign Electricians</button>
      <h3>Assigned Electricians</h3>
      {sites.map((site, index) => (
        <div key={index}>
          <p>
            Site {site.name} in City {site.city} is assigned to Electrician {site.assignedElectrician}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ElectricianAllocationSystem;
