# Cocos CreatorXR v1.1.0

Cocos CreatorXR is an XR content authoring tool based on Cocos Creator and Cocos Engine.

Version requirements

Cocos Creator: 3.7.1 or later.

## Update description

- Added AR feature support for mobile devices.

| AR 特性         | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| AR Session      | Enable, disable, and configure an AR Session on the target platform to control the AR application lifecycle. |
| Device Tracking | Tracking device's pose in physical space.                    |
| AR Camera       | Render the background image of the video stream transmitted by the camera of the device and make light estimation based on the environment. |
| Plane Tracking  | Detect and track planes in the physical world.               |
| Image Tracking  | Detect and track images in the physical world.               |
| Hit Detection   | Supports Ray cast and tracking entities for hit detection.   |
| Anchors         | Trace fixed points in the scene space.                       |
| Meshing         | Meshing the physical world.                                  |

For details about the AR features supported by specific platforms, see official documentation.

- New non-buffered controller haptic feedback:

In the Haptic Event of cc.InteractorEvent, select the type of event you want to turn on vibration and adjust the vibration parameters.

- XRUI one-button conversion function:

Traditional 2D UI can be converted to an XR UI with spatial attributes with one click.

- Gaze interaction:

Interactive behavior is performed according to the fixation center position of the headset.

- XR Video Player:

Optimized video rendering pipeline for XR devices and support for switching display Windows, 180 degree, 360 degree multi-style video. It can meet the needs of users to browse panoramic videos or dynamic materials in 3D scenes.

- XR Content preview New wireless streaming mode:

Preview the XR project in a Web browser and synchronize all signals from the XR device to quickly and completely experience all of the XR project content without packaging the application to the device.

- Screen gesture interactor:

Use screen gestures to manipulate AR virtual objects.
