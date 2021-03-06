// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AddonModAssignSubmissionHandler } from '../providers/submission-delegate';
import { AddonModAssignAssign, AddonModAssignSubmission, AddonModAssignPlugin } from '../providers/assign';

/**
 * Base handler for submission plugins.
 *
 * This class is needed because parent classes cannot have @Injectable in Angular v6, so the default handler cannot be a
 * parent class.
 */
export class AddonModAssignBaseSubmissionHandler implements AddonModAssignSubmissionHandler {
    name = 'AddonModAssignBaseSubmissionHandler';
    type = 'base';

    constructor(protected translate: TranslateService) { }

    /**
     * Whether the plugin can be edited in offline for existing submissions. In general, this should return false if the
     * plugin uses Moodle filters. The reason is that the app only prefetches filtered data, and the user should edit
     * unfiltered data.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @return Boolean or promise resolved with boolean: whether it can be edited in offline.
     */
    canEditOffline(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin): boolean | Promise<boolean> {
        return false;
    }

    /**
     * Check if a plugin has no data.
     *
     * @param assign The assignment.
     * @param plugin The plugin object.
     * @return Whether the plugin is empty.
     */
    isEmpty(assign: AddonModAssignAssign, plugin: AddonModAssignPlugin): boolean {
        return true;
    }

    /**
     * Should clear temporary data for a cancelled submission.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param inputData Data entered by the user for the submission.
     */
    clearTmpData(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, inputData: any): void {
        // Nothing to do.
    }

    /**
     * This function will be called when the user wants to create a new submission based on the previous one.
     * It should add to pluginData the data to send to server based in the data in plugin (previous attempt).
     *
     * @param assign The assignment.
     * @param plugin The plugin object.
     * @param pluginData Object where to store the data to send.
     * @param userId User ID. If not defined, site's current user.
     * @param siteId Site ID. If not defined, current site.
     * @return If the function is async, it should return a Promise resolved when done.
     */
    copySubmissionData(assign: AddonModAssignAssign, plugin: AddonModAssignPlugin, pluginData: any,
            userId?: number, siteId?: string): void | Promise<any> {
        // Nothing to do.
    }

    /**
     * Delete any stored data for the plugin and submission.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param offlineData Offline data stored.
     * @param siteId Site ID. If not defined, current site.
     * @return If the function is async, it should return a Promise resolved when done.
     */
    deleteOfflineData(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, offlineData: any, siteId?: string): void | Promise<any> {
        // Nothing to do.
    }

    /**
     * Return the Component to use to display the plugin data, either in read or in edit mode.
     * It's recommended to return the class of the component, but you can also return an instance of the component.
     *
     * @param injector Injector.
     * @param plugin The plugin object.
     * @param edit Whether the user is editing.
     * @return The component (or promise resolved with component) to use, undefined if not found.
     */
    getComponent(injector: Injector, plugin: AddonModAssignPlugin, edit?: boolean): any | Promise<any> {
        // Nothing to do.
    }

    /**
     * Get files used by this plugin.
     * The files returned by this function will be prefetched when the user prefetches the assign.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param siteId Site ID. If not defined, current site.
     * @return The files (or promise resolved with the files).
     */
    getPluginFiles(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, siteId?: string): any[] | Promise<any[]> {
        return [];
    }

    /**
     * Get a readable name to use for the plugin.
     *
     * @param plugin The plugin object.
     * @return The plugin name.
     */
    getPluginName(plugin: AddonModAssignPlugin): string {
        // Check if there's a translated string for the plugin.
        const translationId = 'addon.mod_assign_submission_' + plugin.type + '.pluginname',
            translation = this.translate.instant(translationId);

        if (translationId != translation) {
            // Translation found, use it.
            return translation;
        }

        // Fallback to WS string.
        if (plugin.name) {
            return plugin.name;
        }
    }

    /**
     * Get the size of data (in bytes) this plugin will send to copy a previous submission.
     *
     * @param assign The assignment.
     * @param plugin The plugin object.
     * @return The size (or promise resolved with size).
     */
    getSizeForCopy(assign: AddonModAssignAssign, plugin: AddonModAssignPlugin): number | Promise<number> {
        return 0;
    }

    /**
     * Get the size of data (in bytes) this plugin will send to add or edit a submission.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @return The size (or promise resolved with size).
     */
    getSizeForEdit(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, inputData: any): number | Promise<number> {
        return 0;
    }

    /**
     * Check if the submission data has changed for this plugin.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param inputData Data entered by the user for the submission.
     * @return Boolean (or promise resolved with boolean): whether the data has changed.
     */
    hasDataChanged(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, inputData: any): boolean | Promise<boolean> {
        return false;
    }

    /**
     * Whether or not the handler is enabled on a site level.
     *
     * @return True or promise resolved with true if enabled.
     */
    isEnabled(): boolean | Promise<boolean> {
        return true;
    }

    /**
     * Whether or not the handler is enabled for edit on a site level.
     * @return Whether or not the handler is enabled for edit on a site level.
     */
    isEnabledForEdit(): boolean | Promise<boolean> {
        return false;
    }

    /**
     * Prefetch any required data for the plugin.
     * This should NOT prefetch files. Files to be prefetched should be returned by the getPluginFiles function.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param siteId Site ID. If not defined, current site.
     * @return Promise resolved when done.
     */
    prefetch?(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, siteId?: string): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Prepare and add to pluginData the data to send to the server based on the input data.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param inputData Data entered by the user for the submission.
     * @param pluginData Object where to store the data to send.
     * @param offline Whether the user is editing in offline.
     * @param userId User ID. If not defined, site's current user.
     * @param siteId Site ID. If not defined, current site.
     * @return If the function is async, it should return a Promise resolved when done.
     */
    prepareSubmissionData(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, inputData: any, pluginData: any, offline?: boolean,
            userId?: number, siteId?: string): void | Promise<any> {
        // Nothing to do.
    }

    /**
     * Prepare and add to pluginData the data to send to the server based on the offline data stored.
     * This will be used when performing a synchronization.
     *
     * @param assign The assignment.
     * @param submission The submission.
     * @param plugin The plugin object.
     * @param offlineData Offline data stored.
     * @param pluginData Object where to store the data to send.
     * @param siteId Site ID. If not defined, current site.
     * @return If the function is async, it should return a Promise resolved when done.
     */
    prepareSyncData(assign: AddonModAssignAssign, submission: AddonModAssignSubmission,
            plugin: AddonModAssignPlugin, offlineData: any, pluginData: any, siteId?: string): void | Promise<any> {
        // Nothing to do.
    }
}
