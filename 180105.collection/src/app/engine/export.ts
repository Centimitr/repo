import {Engine} from './engine';
import {Resource, ResourceSet, ResourceType} from './resource';
import {Storage} from './storage';
import {StorageUsage} from './utils';

window['su'] = {}
window['su'].__getter__ = () => (new StorageUsage()).print()

export {
    Engine,
    Resource,
    ResourceSet,
    ResourceType,
    Storage
}
