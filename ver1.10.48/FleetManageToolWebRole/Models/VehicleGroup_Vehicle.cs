//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace FleetManageToolWebRole.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class VehicleGroup_Vehicle
    {
        public long pkid { get; set; }
        public long groupid { get; set; }
        public long vehicleid { get; set; }
    
        public virtual Vehicle Vehicle { get; set; }
        public virtual VehicleGroup VehicleGroup { get; set; }
    }
}
