# [Getting Started]


The process to get the application running is typically:
#### Git Clone
* Clone the feature/phase_1 branch

  `git clone https://github.com/evoluteio/evo-ui.git -b feature/phase_1`

#### Install Node Modules
* run `npm install` in the following directories:

  evo-ui[feature/phase_1] latest/dataHandling/package.json
  
  evo-ui[feature/phase_1] latest/evoluteData/package.json
  
  evo-ui[feature/phase_1] latest/frontend/package.json
  
  evo-ui[feature/phase_1] latest/package.json

#### Setup MongoDB (version 3.2 or above)
* Import relevant MongoDB data 

* Base Collections 
  Applications and Services - app_infos and service_infos
  Containers - current_container_stats
  Users and Groups - user_infos and group_infos
  Host Rings - hostRing_infos

  http://bit.ly/EvoUIBaseCollections

* Extraction and Aggregation Collections (Visualization Metrics) 
  Extraction - container_stats, network_stats, error_stats, health_stats
  Aggregation - aggregated_container_stats, aggregated_network_stats, aggregated_error_stats, aggregated_health_stats

  http://bit.ly/EvoUIExtractionAggregationDatasets

  The following dataset is for reference and should be used to validate a similar structure is created from the document above. 

  http://bit.ly/EvoUIExtractionAggregationCollections 

#### Automated Build of Backend and Frontend
* Build backend and frontend

  evo-ui[feature/phase_1] scripts/build.sh

#### Automated Start of MongoDB, Backend and Frontend
* Start all

  evo-ui[feature/phase_1] scripts/start.sh

#### Automated Stop of Backend and Frontend
* Stop application backend and frontend

  evo-ui[feature/phase_1] scripts/stop-app.sh


#### Automated Stop of MongoDB, Backend and Frontend
* Stop database, application backend and frontend

  evo-ui[feature/phase_1] scripts/stop-db-app.sh


#### Manual Start Backend and Frontend
* Start backend and frontend

  evo-ui[feature/phase_1] latest/evoluteData $ node evoluteData.js
  
  evo-ui[feature/phase_1] latest/frontend $ npm run dev

#### Access Frontend
 * Access UI via http://localhost:8080
