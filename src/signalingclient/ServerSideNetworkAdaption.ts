// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SdkServerSideNetworkAdaption } from '../signalingprotocol/SignalingProtocol';

/**
 * [[ServerSideNetworkAdaption]] represents additional server side features that can be enabled for network adaption.
 */
export enum ServerSideNetworkAdaption {
  /**
   * No features enabled, but can be overriden from server side values.
   */
  Default,

  /**
   * No features enabled. Will not be override from server side choice.
   */
  None,

  /**
   * Note: This value is deprecated and will be mapped to 'BandwidthProbingAndRemoteVideoQualityAdaption'
   * in a later release.
   *
   * Disable the existing client side bandwidth probing methods of waiting and unpausing,
   * or waiting and upgrading simulcast streams (which can be large increases of bitrates
   * and may lead to periodic oversubscription over network capacity
   * and resulting video freezes) and replace it with more gradual server
   * side probing of increasing amounts padding packets until the
   * bandwidth estimate safely reaches the value needed to resume the
   * next video source, or upgrade to the next higher simulcast stream.
   *
   * When this is enabled, any policy 'probing' for bandwidth headroom
   * should be disabled. This may also enable pacing of some media packets from the server
   * side, and may also enable packet burst probing.
   *
   * End users should overall see reduced video freezes, reduced broken audio,
   * and reduced packet loss.
   */
  BandwidthProbing,

  /**
   * Disable internal policy behavior and proxy priorities to server to automatically
   * switch, pause, or resume streams based on server calculated network constraints. This will
   * significantly improve response times when network constraints occur. This will also support the
   * features covered in `BandwidthProbing` though possibly with different implementation details.
   *
   * End users should overall see reduced video freezes, reduced broken audio, and reduced packet loss.
   * The value impacts response to network events and may lead to remote video pauses/downgrades
   * that did not occur before.
   */
  BandwidthProbingAndRemoteVideoQualityAdaption,
}

export default ServerSideNetworkAdaption;

export function serverSideNetworkAdaptionIsNoneOrDefault(
  adaption: ServerSideNetworkAdaption
): boolean {
  return (
    adaption === ServerSideNetworkAdaption.None || adaption === ServerSideNetworkAdaption.Default
  );
}

export function convertServerSideNetworkAdaptionEnumFromSignaled(
  adaption: SdkServerSideNetworkAdaption
): ServerSideNetworkAdaption {
  switch (adaption) {
    case SdkServerSideNetworkAdaption.DEFAULT:
      return ServerSideNetworkAdaption.Default;
    case SdkServerSideNetworkAdaption.NONE:
      return ServerSideNetworkAdaption.None;
    case SdkServerSideNetworkAdaption.BANDWIDTH_PROBING:
      return ServerSideNetworkAdaption.BandwidthProbing;
    case SdkServerSideNetworkAdaption.BANDWIDTH_PROBING_AND_VIDEO_QUALITY_ADAPTION:
      return ServerSideNetworkAdaption.BandwidthProbingAndRemoteVideoQualityAdaption;
  }
}

export function convertServerSideNetworkAdaptionEnumToSignaled(
  adaption: ServerSideNetworkAdaption
): SdkServerSideNetworkAdaption {
  switch (adaption) {
    case ServerSideNetworkAdaption.Default:
      return SdkServerSideNetworkAdaption.DEFAULT;
    case ServerSideNetworkAdaption.None:
      return SdkServerSideNetworkAdaption.NONE;
    case ServerSideNetworkAdaption.BandwidthProbing:
      return SdkServerSideNetworkAdaption.BANDWIDTH_PROBING;
    case ServerSideNetworkAdaption.BandwidthProbingAndRemoteVideoQualityAdaption:
      return SdkServerSideNetworkAdaption.BANDWIDTH_PROBING_AND_VIDEO_QUALITY_ADAPTION;
  }
}
