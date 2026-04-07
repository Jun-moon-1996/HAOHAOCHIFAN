import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, XCircle, Search, Loader2, Navigation } from 'lucide-react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  useMap, 
  useMapsLibrary 
} from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function MapController({ onCenterChange }: { onCenterChange: (lat: number, lng: number) => void }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    const listener = map.addListener('idle', () => {
      const center = map.getCenter();
      if (center) {
        onCenterChange(center.lat(), center.lng());
      }
    });
    
    return () => google.maps.event.removeListener(listener);
  }, [map, onCenterChange]);
  
  return null;
}

function PlaceAutocomplete({ onPlaceSelect }: { onPlaceSelect: (place: any) => void }) {
  const placesLib = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!placesLib || !inputRef.current) return;
    
    const autocomplete = new placesLib.Autocomplete(inputRef.current, {
      fields: ['address_components', 'geometry', 'name', 'formatted_address'],
    });
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        onPlaceSelect(place);
      }
    });
    
    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [placesLib, onPlaceSelect]);
  
  return (
    <input 
      ref={inputRef}
      type="text"
      placeholder="搜索地址"
      className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-300"
    />
  );
}

export default function AddressEdit() {
  const { setView, addAddress, updateAddress, addresses, editingAddressId, setEditingAddressId } = useAppStore();
  const editingAddress = addresses.find(a => a.id === editingAddressId);

  const [gender, setGender] = useState<'先生' | '女士'>(editingAddress?.gender || '先生');
  const [label, setLabel] = useState(editingAddress?.label || '家');
  const [doorNumber, setDoorNumber] = useState(editingAddress?.doorNumber || '');
  const [contactName, setContactName] = useState(editingAddress?.contactName || '');
  const [phone, setPhone] = useState(editingAddress?.phone || '');
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(
    editingAddress ? { lat: editingAddress.lat, lng: editingAddress.lng } : { lat: 23.3667, lng: 116.7000 }
  );
  const [addressName, setAddressName] = useState(editingAddress?.name || '君悦海湾-7栋-2梯');
  const [addressDetail, setAddressDetail] = useState(editingAddress?.detail || '广东省汕头市龙湖区');
  const [isDefault, setIsDefault] = useState(editingAddress?.isDefault || false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  const geocodingLib = useMapsLibrary('geocoding');
  const geocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reverseGeocode = useCallback((lat: number, lng: number) => {
    if (!geocodingLib) return;
    
    if (geocodeTimeoutRef.current) clearTimeout(geocodeTimeoutRef.current);

    geocodeTimeoutRef.current = setTimeout(async () => {
      const geocoder = new geocodingLib.Geocoder();
      try {
        const response = await geocoder.geocode({ location: { lat, lng } });
        if (response.results && response.results[0]) {
          const result = response.results[0];
          setAddressDetail(result.formatted_address);
          // Try to find a meaningful name from address components
          const name = result.address_components[0]?.long_name || '未知地点';
          setAddressName(name);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    }, 500);
  }, [geocodingLib]);

  const handlePlaceSelect = async (place: any) => {
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCenter({ lat, lng });
      setAddressName(place.name || '未知地点');
      setAddressDetail(place.formatted_address || '');
      setIsSearching(false);
    } else if (typeof place.fetchFields === 'function') {
      // Handle new Places API Place object if it somehow comes through
      await place.fetchFields({ fields: ['displayName', 'location', 'formattedAddress'] });
      if (place.location) {
        const lat = place.location.lat();
        const lng = place.location.lng();
        setCenter({ lat, lng });
        setAddressName(place.displayName || '未知地点');
        setAddressDetail(place.formattedAddress || '');
        setIsSearching(false);
      }
    }
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
          setIsLocating(false);
        },
        () => setIsLocating(false),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleSave = () => {
    if (!addressName || !phone) {
      alert('请填写完整信息');
      return;
    }

    const addressData = {
      id: editingAddressId || Math.random().toString(36).substr(2, 9),
      name: addressName,
      detail: addressDetail,
      doorNumber,
      label,
      contactName,
      gender,
      phone,
      lat: center.lat,
      lng: center.lng,
      isDefault,
    };

    if (editingAddressId) {
      updateAddress(addressData);
    } else {
      addAddress(addressData);
    }
    
    setEditingAddressId(null);
    setView('address-list');
  };

  const handleBack = () => {
    setEditingAddressId(null);
    setView('address-list');
  };

  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center h-screen bg-white p-4 font-sans">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-black text-gray-900 mb-4">需要 Google Maps API Key</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">请按照以下步骤添加您的 API 密钥以启用地图功能：</p>
          <div className="text-left space-y-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <p className="text-sm"><strong>第一步:</strong> <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noopener" className="text-blue-600 underline">获取 API Key</a></p>
            <p className="text-sm"><strong>第二步:</strong> 在 AI Studio 中添加密钥：</p>
            <ul className="text-xs space-y-2 text-gray-600 list-disc pl-4">
              <li>点击右上角的 <strong>Settings</strong> (⚙️ 齿轮图标)</li>
              <li>选择 <strong>Secrets</strong></li>
              <li>添加名为 <code>GOOGLE_MAPS_PLATFORM_KEY</code> 的密钥</li>
              <li>粘贴您的 API Key 并保存</li>
            </ul>
          </div>
          <p className="mt-6 text-xs text-gray-400">添加密钥后，应用将自动重新构建。</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="h-screen bg-gray-50 overflow-y-auto pb-10">
        {/* Header */}
        <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-[1100] backdrop-blur-lg">
          <div className="h-[44px] flex items-center relative">
            <button onClick={handleBack} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {editingAddressId ? '修改收货地址' : '新增收货地址'}
            </h1>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative h-80 bg-gray-100 overflow-hidden">
          <Map
            center={center}
            zoom={15}
            mapId="DEMO_MAP_ID"
            disableDefaultUI={true}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            <AdvancedMarker position={center}>
              <Pin background="#5DBE61" glyphColor="#fff" borderColor="#388E3C" />
            </AdvancedMarker>
            <MapController onCenterChange={(lat, lng) => {
              setCenter({ lat, lng });
              reverseGeocode(lat, lng);
            }} />
          </Map>

          {/* Locate Me Button */}
          <button 
            onClick={handleLocateMe}
            disabled={isLocating}
            className="absolute top-4 right-4 z-[1000] p-3 bg-white rounded-full shadow-lg active:scale-90 transition-all disabled:opacity-50"
          >
            <Navigation className={`w-5 h-5 text-gray-700 ${isLocating ? 'animate-pulse' : ''}`} />
          </button>
          
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 z-[1000]">
            {isSearching ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                  </div>
                  <button 
                    onClick={() => setIsSearching(false)}
                    className="text-xs font-bold text-gray-400 px-2"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="text-sm font-bold text-gray-800 truncate">{addressName}</div>
                  <div className="text-[10px] text-gray-400 truncate leading-relaxed">{addressDetail}</div>
                </div>
                <button 
                  onClick={() => setIsSearching(true)}
                  className="px-5 py-3 bg-[#5DBE61] text-white rounded-xl text-xs font-black shadow-lg shadow-[#5DBE61]/20 active:scale-95 transition-all whitespace-nowrap"
                >
                  修改地址
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="px-4 mt-4 space-y-4">
          <div className="bg-white rounded-[2.5rem] p-8 space-y-8 shadow-sm border border-gray-100">
            {/* Door Number */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <span className="text-sm font-bold text-gray-800 w-24">门牌号</span>
              <div className="flex-1 flex items-center">
                <input 
                  type="text" 
                  placeholder="例：7栋2单元101"
                  value={doorNumber}
                  onChange={(e) => setDoorNumber(e.target.value)}
                  className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300"
                />
                {doorNumber && <XCircle className="w-4 h-4 text-gray-200 cursor-pointer" onClick={() => setDoorNumber('')} />}
              </div>
            </div>

            {/* Label */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <span className="text-sm font-bold text-gray-800 w-24">标签</span>
              <div className="flex-1 flex gap-3">
                {['家', '公司', '学校'].map(l => (
                  <button 
                    key={l}
                    onClick={() => setLabel(l)}
                    className={`px-6 py-3 rounded-2xl text-xs font-bold border transition-all ${
                      label === l 
                        ? 'bg-[#5DBE61] border-[#5DBE61] text-white shadow-xl shadow-[#5DBE61]/20' 
                        : 'bg-gray-50 border-transparent text-gray-400'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <span className="text-sm font-bold text-gray-800 w-24">联系人</span>
              <div className="flex-1 space-y-5">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="姓名"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300"
                  />
                  {contactName && <XCircle className="w-4 h-4 text-gray-200 cursor-pointer" onClick={() => setContactName('')} />}
                </div>
                <div className="flex gap-8">
                  <button 
                    onClick={() => setGender('先生')}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      gender === '先生' ? 'border-[#5DBE61] bg-[#5DBE61]' : 'border-gray-200'
                    }`}>
                      {gender === '先生' && <div className="w-2 h-2 bg-white rounded-full shadow-sm" />}
                    </div>
                    <span className={`text-xs font-bold ${gender === '先生' ? 'text-gray-900' : 'text-gray-400'}`}>先生</span>
                  </button>
                  <button 
                    onClick={() => setGender('女士')}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      gender === '女士' ? 'border-[#5DBE61] bg-[#5DBE61]' : 'border-gray-200'
                    }`}>
                      {gender === '女士' && <div className="w-2 h-2 bg-white rounded-full shadow-sm" />}
                    </div>
                    <span className={`text-xs font-bold ${gender === '女士' ? 'text-gray-900' : 'text-gray-400'}`}>女士</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <span className="text-sm font-bold text-gray-800 w-24">手机号</span>
              <div className="flex-1 flex items-center">
                <input 
                  type="text" 
                  placeholder="手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-300"
                />
                {phone && <XCircle className="w-4 h-4 text-gray-200 cursor-pointer" onClick={() => setPhone('')} />}
              </div>
            </div>

            {/* Set Default */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">设为默认地址</span>
                <span className="text-[10px] text-gray-400">下单时优先使用该地址</span>
              </div>
              <button 
                onClick={() => setIsDefault(!isDefault)}
                className={`w-12 h-6 rounded-full transition-all relative ${isDefault ? 'bg-[#5DBE61]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDefault ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            className="w-full bg-gray-900 hover:bg-black text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-gray-200 transition-all active:scale-[0.98] mt-10"
          >
            保存地址
          </button>
        </div>
      </div>
    </APIProvider>
  );
}
