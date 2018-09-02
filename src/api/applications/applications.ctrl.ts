import {APPLICATION_CREATED, Application} from "./Application";
import {ApplicationsService} from "./applications.service";

export const ApplicationsController =
    (events) =>
        (as: ApplicationsService) => ({

            submitApplication: (req, res, next) => {

                const application: Application = as.createApplication(req.body)
                events.emit(APPLICATION_CREATED, application)

                return res.json({msg: 'Done! Application has been submitted for processing', application})
            }

        })